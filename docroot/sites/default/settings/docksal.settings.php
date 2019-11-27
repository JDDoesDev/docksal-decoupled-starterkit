<?php
// @codingStandardsIgnoreFile

/**
 * @file
 * Docksal settings.
 */

// Docksal dev evn database configuration.
$databases = [
  'default' =>
    [
      'default' =>
        [
          'database' => 'default',
          'username' => 'user',
          'password' => 'user',
          'host' => 'db',
          'port' => '3306',
          'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
          'driver' => 'mysql',
          'prefix' => '',
        ],
    ],
];
