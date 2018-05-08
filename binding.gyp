{
  "targets": [
    {
      "target_name": "native_opencv",
      "sources": [ "native-denoising/image_rotation.cc", "native-denoising/image_rotation.cc" ],
      "cflags_cc!": [ "-fno-rtti", "-fno-exceptions" ],
      "include_dirs": [ "/usr/local/include/opencv, /usr/local/include/opencv2" ],
      "libraries": [ "/usr/local/lib/libopencv_core.so" ]
    }
  ]
}