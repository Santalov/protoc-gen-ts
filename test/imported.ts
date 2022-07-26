/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.1
 * source: test/_/imported.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace importdirective {
    export class Imported extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {}) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") { }
        }
        static fromObject(data?: Imported.AsObjectPartial): Imported {
            if (!data) {
                return new Imported();
            }
            const message = new Imported({});
            return message;
        }
        toObject() {
            const data: Imported.AsObject = {};
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Imported {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Imported();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Imported {
            return Imported.deserialize(bytes);
        }
    }
    export namespace Imported {
        export type AsObject = {};
        export type AsObjectPartial = {};
        export class SubMessage extends pb_1.Message {
            #one_of_decls: number[][] = [];
            constructor(data?: any[] | {
                key?: Imported.SubMessage.MyEnum;
            }) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("key" in data && data.key != undefined) {
                        this.key = data.key;
                    }
                }
            }
            get key() {
                return pb_1.Message.getFieldWithDefault(this, 1, Imported.SubMessage.MyEnum.VALUE) as Imported.SubMessage.MyEnum;
            }
            set key(value: Imported.SubMessage.MyEnum) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data?: SubMessage.AsObjectPartial): SubMessage {
                if (!data) {
                    return new SubMessage();
                }
                const message = new SubMessage({});
                if (data.key != null) {
                    message.key = data.key;
                }
                return message;
            }
            toObject() {
                const data: SubMessage.AsObject = {
                    key: this.key
                };
                return data;
            }
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
                const writer = w || new pb_1.BinaryWriter();
                if (this.key != Imported.SubMessage.MyEnum.VALUE)
                    writer.writeEnum(1, this.key);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SubMessage {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SubMessage();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.key = reader.readEnum();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary(): Uint8Array {
                return this.serialize();
            }
            static deserializeBinary(bytes: Uint8Array): SubMessage {
                return SubMessage.deserialize(bytes);
            }
        }
        export namespace SubMessage {
            export type AsObject = {
                key: Imported.SubMessage.MyEnum;
            };
            export type AsObjectPartial = {
                key?: Imported.SubMessage.MyEnum;
            };
            export enum MyEnum {
                VALUE = 0,
                VALUE2 = 1
            }
        }
    }
}
