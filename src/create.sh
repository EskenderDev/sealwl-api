#!/bin/bash
modules='modules/'
$(nest g module "${modules}auth")
$(nest g service "${modules}auth")
$(nest g controller "${modules}auth")
