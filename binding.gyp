{
  "targets": [
    {
      "target_name": "native_denoiser",
      "sources": [ "backend-implementation/native-denoising/denoising.cc" ],
      "include_dirs": [ "/usr/include/opencv/" ],
      "link_settings": {
	      "libraries": [ "-lopencv_core, -lopencv_contrib" ],
	      "libraries_dirs": [ "usr/lib" ]
      }
    }
  ]
}