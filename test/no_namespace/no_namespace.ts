/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.1
 * source: test/_/no_namespace/no_namespace.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./nested";
import * as dependency_2 from "./double_nested";
import * as pb_1 from "google-protobuf";
export class NoNamespace extends pb_1.Message {
    #one_of_decls: number[][] = [];
    constructor(data?: any[] | {
        label?: dependency_1.eventTarget;
        other_fields?: dependency_2.MessageFields;
        batch_fields?: dependency_1.eventSchedulingContextBatch;
    }) {
        super();
        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
        if (!Array.isArray(data) && typeof data == "object") {
            if ("label" in data && data.label != undefined) {
                this.label = data.label;
            }
            if ("other_fields" in data && data.other_fields != undefined) {
                this.other_fields = data.other_fields;
            }
            if ("batch_fields" in data && data.batch_fields != undefined) {
                this.batch_fields = data.batch_fields;
            }
        }
    }
    get label() {
        return pb_1.Message.getWrapperField(this, dependency_1.eventTarget, 1) as dependency_1.eventTarget | undefined;
    }
    set label(value: dependency_1.eventTarget | undefined) {
        pb_1.Message.setWrapperField(this, 1, value);
    }
    get has_label() {
        return pb_1.Message.getField(this, 1) != null;
    }
    get other_fields() {
        return pb_1.Message.getWrapperField(this, dependency_2.MessageFields, 2) as dependency_2.MessageFields | undefined;
    }
    set other_fields(value: dependency_2.MessageFields | undefined) {
        pb_1.Message.setWrapperField(this, 2, value);
    }
    get has_other_fields() {
        return pb_1.Message.getField(this, 2) != null;
    }
    get batch_fields() {
        return pb_1.Message.getWrapperField(this, dependency_1.eventSchedulingContextBatch, 3) as dependency_1.eventSchedulingContextBatch | undefined;
    }
    set batch_fields(value: dependency_1.eventSchedulingContextBatch | undefined) {
        pb_1.Message.setWrapperField(this, 3, value);
    }
    get has_batch_fields() {
        return pb_1.Message.getField(this, 3) != null;
    }
    static fromObject(data?: NoNamespaceAsObjectPartial): NoNamespace {
        if (!data) {
            return new NoNamespace();
        }
        const message = new NoNamespace({});
        if (data.label != null) {
            message.label = dependency_1.eventTarget.fromObject(data.label);
        }
        if (data.other_fields != null) {
            message.other_fields = dependency_2.MessageFields.fromObject(data.other_fields);
        }
        if (data.batch_fields != null) {
            message.batch_fields = dependency_1.eventSchedulingContextBatch.fromObject(data.batch_fields);
        }
        return message;
    }
    toObject() {
        const data: NoNamespaceAsObject = {};
        if (this.label != null) {
            data.label = this.label.toObject();
        }
        if (this.other_fields != null) {
            data.other_fields = this.other_fields.toObject();
        }
        if (this.batch_fields != null) {
            data.batch_fields = this.batch_fields.toObject();
        }
        return data;
    }
    serialize(): Uint8Array;
    serialize(w: pb_1.BinaryWriter): void;
    serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
        const writer = w || new pb_1.BinaryWriter();
        if (this.has_label)
            writer.writeMessage(1, this.label, () => this.label!.serialize(writer));
        if (this.has_other_fields)
            writer.writeMessage(2, this.other_fields, () => this.other_fields!.serialize(writer));
        if (this.has_batch_fields)
            writer.writeMessage(3, this.batch_fields, () => this.batch_fields!.serialize(writer));
        if (!w)
            return writer.getResultBuffer();
    }
    static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NoNamespace {
        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NoNamespace();
        while (reader.nextField()) {
            if (reader.isEndGroup())
                break;
            switch (reader.getFieldNumber()) {
                case 1:
                    reader.readMessage(message.label, () => message.label = dependency_1.eventTarget.deserialize(reader));
                    break;
                case 2:
                    reader.readMessage(message.other_fields, () => message.other_fields = dependency_2.MessageFields.deserialize(reader));
                    break;
                case 3:
                    reader.readMessage(message.batch_fields, () => message.batch_fields = dependency_1.eventSchedulingContextBatch.deserialize(reader));
                    break;
                default: reader.skipField();
            }
        }
        return message;
    }
    serializeBinary(): Uint8Array {
        return this.serialize();
    }
    static deserializeBinary(bytes: Uint8Array): NoNamespace {
        return NoNamespace.deserialize(bytes);
    }
}
export type NoNamespaceAsObject = {
    label?: dependency_1.eventTargetAsObject;
    other_fields?: dependency_2.MessageFieldsAsObject;
    batch_fields?: dependency_1.eventSchedulingContextBatchAsObject;
};
export type NoNamespaceAsObjectPartial = {
    label?: dependency_1.eventTargetAsObjectPartial;
    other_fields?: dependency_2.MessageFieldsAsObjectPartial;
    batch_fields?: dependency_1.eventSchedulingContextBatchAsObjectPartial;
};
