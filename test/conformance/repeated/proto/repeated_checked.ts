/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.1
 * source: test/conformance/repeated/proto/repeated.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace repeated {
    export class RepeatedWithOptions extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            implicitly_packed?: number[];
            explicitly_packed?: number[];
            explicitly_not_packed?: number[];
            implicitly_packed_options?: number[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 2, 3, 4], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("implicitly_packed" in data && data.implicitly_packed != undefined) {
                    this.implicitly_packed = data.implicitly_packed;
                }
                if ("explicitly_packed" in data && data.explicitly_packed != undefined) {
                    this.explicitly_packed = data.explicitly_packed;
                }
                if ("explicitly_not_packed" in data && data.explicitly_not_packed != undefined) {
                    this.explicitly_not_packed = data.explicitly_not_packed;
                }
                if ("implicitly_packed_options" in data && data.implicitly_packed_options != undefined) {
                    this.implicitly_packed_options = data.implicitly_packed_options;
                }
            }
        }
        get implicitly_packed() {
            return pb_1.Message.getFieldWithDefault(this, 1, []) as number[];
        }
        set implicitly_packed(value: number[]) {
            pb_1.Message.setField(this, 1, value);
        }
        get explicitly_packed() {
            return pb_1.Message.getFieldWithDefault(this, 2, []) as number[];
        }
        set explicitly_packed(value: number[]) {
            pb_1.Message.setField(this, 2, value);
        }
        get explicitly_not_packed() {
            return pb_1.Message.getFieldWithDefault(this, 3, []) as number[];
        }
        set explicitly_not_packed(value: number[]) {
            pb_1.Message.setField(this, 3, value);
        }
        get implicitly_packed_options() {
            return pb_1.Message.getFieldWithDefault(this, 4, []) as number[];
        }
        set implicitly_packed_options(value: number[]) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            implicitly_packed?: number[];
            explicitly_packed?: number[];
            explicitly_not_packed?: number[];
            implicitly_packed_options?: number[];
        }): RepeatedWithOptions {
            const message = new RepeatedWithOptions({});
            if (data.implicitly_packed != null) {
                message.implicitly_packed = data.implicitly_packed;
            }
            if (data.explicitly_packed != null) {
                message.explicitly_packed = data.explicitly_packed;
            }
            if (data.explicitly_not_packed != null) {
                message.explicitly_not_packed = data.explicitly_not_packed;
            }
            if (data.implicitly_packed_options != null) {
                message.implicitly_packed_options = data.implicitly_packed_options;
            }
            return message;
        }
        toObject() {
            const data: {
                implicitly_packed?: number[];
                explicitly_packed?: number[];
                explicitly_not_packed?: number[];
                implicitly_packed_options?: number[];
            } = {};
            if (this.implicitly_packed != null) {
                data.implicitly_packed = this.implicitly_packed;
            }
            if (this.explicitly_packed != null) {
                data.explicitly_packed = this.explicitly_packed;
            }
            if (this.explicitly_not_packed != null) {
                data.explicitly_not_packed = this.explicitly_not_packed;
            }
            if (this.implicitly_packed_options != null) {
                data.implicitly_packed_options = this.implicitly_packed_options;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.implicitly_packed.length)
                writer.writePackedInt64(1, this.implicitly_packed);
            if (this.explicitly_packed.length)
                writer.writePackedInt64(2, this.explicitly_packed);
            if (this.explicitly_not_packed.length)
                writer.writeRepeatedInt64(3, this.explicitly_not_packed);
            if (this.implicitly_packed_options.length)
                writer.writePackedInt64(4, this.implicitly_packed_options);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RepeatedWithOptions {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RepeatedWithOptions();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.implicitly_packed = reader.readPackedInt64();
                        break;
                    case 2:
                        message.explicitly_packed = reader.readPackedInt64();
                        break;
                    case 3:
                        pb_1.Message.addToRepeatedField(message, 3, reader.readInt64());
                        break;
                    case 4:
                        message.implicitly_packed_options = reader.readPackedInt64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): RepeatedWithOptions {
            return RepeatedWithOptions.deserialize(bytes);
        }
    }
}
