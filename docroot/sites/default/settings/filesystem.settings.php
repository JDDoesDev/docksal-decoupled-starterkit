<?php

/**
 * @file
 * File system override configuration feature.
 */

// Workaround for permission issues with NFS shares in Vagrant.
$settings['file_chmod_directory'] = 0777;
$settings['file_chmod_file'] = 0666;
