<?php

/*
 *  If you're using custom tags, you need to add them to Kirby's Sane class allowed tags,
 *  otherwise the writer field content parsed by the sanitizer would strip them out.
 */
// \Kirby\Sane\Html::$allowedTags['custom-tag'] = true;

\Kirby\Cms\App::plugin('coralic/kirby-writer-nodes', []);
