import * as descriptor from "./compiler/descriptor.js";
import * as ts from "typescript";
import * as op from "./option.js";

const symbolMap: Map<string, string> = new Map();
const dependencyMap: Map<string, ts.Identifier> = new Map();
const mapMap: Map<string, descriptor.DescriptorProto> = new Map();
const enumLeadingMemberMap: Map<string, string> = new Map();
const packages: string[] = [];
let config: op.Options;

export function initialize(configParameters: op.Options): void
{
    config = configParameters;
}

export function resetDependencyMap() {
  dependencyMap.clear();
}

export function setIdentifierForDependency(
  dependency: string,
  identifier: ts.Identifier,
) {
  dependencyMap.set(dependency, identifier);
}

function isMapEntry(descriptor: descriptor.DescriptorProto): boolean {
  return descriptor?.options?.map_entry ?? false;
}

export function getMapDescriptor(
  typeName: string,
): descriptor.DescriptorProto | undefined {
  return mapMap.get(typeName);
}

export function getLeadingEnumMember(
  type_name: string,
): string | undefined {
  return enumLeadingMemberMap.get(type_name);
}

export function getTypeReferenceExpr(
  rootDescriptor: descriptor.FileDescriptorProto,
  typeName: string,
): ts.Identifier | ts.PropertyAccessExpression {
  const path = symbolMap.get(typeName);

  if (!path || !dependencyMap.has(path)) {
    if (config.no_namespace) {
      return ts.factory.createIdentifier(
        removeRootParentName(typeName, rootDescriptor.package).replace(/\./g, ''),
      );
    }
    return ts.factory.createIdentifier(
      removeRootParentName(typeName, rootDescriptor.package),
    );
  }

  const name = removeNamespace(removeLeadingDot(typeName));

  return ts.factory.createPropertyAccessExpression(
    dependencyMap.get(path)!,
    name,
  )
}
export function getTypeReference(
  rootDescriptor: descriptor.FileDescriptorProto,
  typeName: string,
  asObject = false, // add 'AsObject' to the end of the type reference
): ts.TypeReferenceNode {
  const path = symbolMap.get(typeName);

  if (!path || !dependencyMap.has(path)) {
    if (config.no_namespace) {
      return ts.factory.createTypeReferenceNode(
        addAsObject(
          removeRootParentName(typeName, rootDescriptor.package).replace(/\./g, ""),
          asObject,
        ),
      );
    }
    return ts.factory.createTypeReferenceNode(
      addAsObject(
        removeRootParentName(typeName, rootDescriptor.package),
        asObject,
      ),
    );
  }

  const name = addAsObject(
    removeNamespace(removeLeadingDot(typeName)),
    asObject,
  );

  return ts.factory.createTypeReferenceNode(
    ts.factory.createQualifiedName(
      dependencyMap.get(path)!,
      name,
    ),
  );
}

function removeLeadingDot(name: string): string {
  return name.replace(/^\./, "");
}

function replaceDoubleDots(name: string): string {
  return name.replace(/\.\./g, ".");
}

function removeRootParentName(name: string, parentName: string): string {
  return removeLeadingDot(
    parentName ? name.replace(`${parentName}.`, "") : name,
  );
}

export function addAsObject(name: string, asObject: boolean) {
  if (asObject) {
    return name + (config.no_namespace ? "" : ".") + "AsObject";
  }
  return name;
}

function removeNamespace(name: string): string {
  if(config.no_namespace)
  {
    return removeRootParentName(name, packages.find(p => name.startsWith(p))).replace(/\./g, '')
  }
  return name;
}

export function preprocess(
  targetDescriptor: descriptor.FileDescriptorProto | descriptor.DescriptorProto,
  path: string,
  prefix: string,
) {
  if(targetDescriptor instanceof descriptor.FileDescriptorProto)
  {
    packages.push(targetDescriptor.package);
  }

  for (const enumDescriptor of targetDescriptor.enum_type) {
    const name = replaceDoubleDots(`${prefix}.${enumDescriptor.name}`)
    symbolMap.set(name, path);
    enumLeadingMemberMap.set(name, enumDescriptor.value[0].name);
  }

  const messages: descriptor.DescriptorProto[] =
    targetDescriptor instanceof descriptor.FileDescriptorProto
      ? targetDescriptor.message_type
      : targetDescriptor.nested_type;

  for (let index = messages.length - 1; index >= 0; index--) {
    const messageDescriptor = messages[index];
    const name = replaceDoubleDots(`${prefix}.${messageDescriptor.name}`);

    if (isMapEntry(messageDescriptor)) {
      mapMap.set(name, messageDescriptor);
      messages.splice(index, 1);

      continue;
    }

    symbolMap.set(name, path);
    preprocess(messageDescriptor, path, name);
  }
}

/**
 * https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript
 * Creates a recursive Partial type.
 * Need this to prevent separate declaration of the fromObject argument type.
 * ```typescript
 * type RecursivePartial<T> = {
 *   [P in keyof T]?:
 *     T[P] extends (infer U)[] ? RecursivePartial<U>[] :
 *     T[P] extends object ? RecursivePartial<T[P]> :
 *     T[P];
 * };
 * ```
 */
export function recursivePartialDeclaration() {
  // the easiest way to create AST for a simple static declaration
  const sourceFile = ts.createSourceFile(
    "fileIsNeverCreatedNameIsNotUsed.ts",
    `
    type RecursivePartial<T> = {
      [P in keyof T]?:
        T[P] extends (infer U)[] ? RecursivePartial<U>[] :
        T[P] extends Uint8Array ? T[P]
        T[P] extends object ? RecursivePartial<T[P]> :
        T[P];
    }
    `,
    ts.ScriptTarget.Latest,
    true
  );
  return sourceFile.statements[0];
}

/**
 * Given the type T constructs RecursivePartial<T>
 * @param typeNode type node for T
 */
export function wrapRecursivePartial(typeNode: ts.TypeReferenceNode) {
  return ts.factory.createTypeReferenceNode(
    ts.factory.createIdentifier("RecursivePartial"),
    [typeNode]
  )
}
