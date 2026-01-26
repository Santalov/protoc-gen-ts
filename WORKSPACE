workspace(name = "protoc_gen_ts")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "new_git_repository", "git_repository")


# Setup NodeJS toolchain
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "6b951612ce13738516398a8057899394e2b7a779be91e1a68f75f25c0a938864",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.0.0/rules_nodejs-5.0.0.tar.gz"],
)

load("@build_bazel_rules_nodejs//:repositories.bzl", "build_bazel_rules_nodejs_dependencies")

build_bazel_rules_nodejs_dependencies()

load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")


node_repositories(
    node_version = "16.3.0"
)

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
    # See: https://github.com/bazelbuild/rules_nodejs/issues/3280
    exports_directories_only = False
)

# zlib - pinned to version compatible with modern macOS/Clang
http_archive(
    name = "zlib",
    build_file_content = """
cc_library(
    name = "zlib",
    srcs = [
        "adler32.c",
        "compress.c",
        "crc32.c",
        "deflate.c",
        "gzclose.c",
        "gzlib.c",
        "gzread.c",
        "gzwrite.c",
        "infback.c",
        "inffast.c",
        "inflate.c",
        "inftrees.c",
        "trees.c",
        "uncompr.c",
        "zutil.c",
    ],
    hdrs = glob(["*.h"]),
    copts = [
        "-Wno-implicit-function-declaration",
        "-DHAVE_UNISTD_H",
    ],
    includes = ["."],
    visibility = ["//visibility:public"],
)
""",
    sha256 = "9a93b2b7dfdac77ceba5a558a580e74667dd6fede4585b91eefb60f03b72df23",
    strip_prefix = "zlib-1.3.1",
    urls = ["https://github.com/madler/zlib/releases/download/v1.3.1/zlib-1.3.1.tar.gz"],
)

# Protobuf - pinned to version with well_known_protos target
http_archive(
    name = "com_google_protobuf",
    sha256 = "87407cd28e7a9c95d9f61a098a53cf031109d451a7763e7dd1253abf8b4df422",
    strip_prefix = "protobuf-3.19.1",
    urls = ["https://github.com/protocolbuffers/protobuf/archive/refs/tags/v3.19.1.tar.gz"],
)

load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps")

protobuf_deps()

# Setup Protocol Buffers toolchain
http_archive(
    name = "rules_proto",
    sha256 = "66bfdf8782796239d3875d37e7de19b1d94301e8972b3cbd2446b332429b4df1",
    strip_prefix = "rules_proto-4.0.0",
    urls = ["https://github.com/bazelbuild/rules_proto/archive/refs/tags/4.0.0.tar.gz"],
)

load("@rules_proto//proto:repositories.bzl", "rules_proto_dependencies", "rules_proto_toolchains")

rules_proto_dependencies()

rules_proto_toolchains()


# skylib
http_archive(
    name = "bazel_skylib",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.1.1/bazel-skylib-1.1.1.tar.gz",
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.1.1/bazel-skylib-1.1.1.tar.gz",
    ],
    sha256 = "c6966ec828da198c5d9adbaa94c05e3a1c7f21bd012a0b29ba8ddbccb2c93b0d",
)

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")
bazel_skylib_workspace()

# 3rd party: protobuf
new_git_repository(
    name = "third_party_protobuf",
    remote = "https://github.com/protocolbuffers/protobuf.git",
    commit = "41e22cde8d8a44c35127a26c19e08b180e0b30a4",
    strip_prefix = "src/google",
    shallow_since = "1642118709 -0800",
    build_file = "//tools:BUILD.protobuf"
)