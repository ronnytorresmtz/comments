<?php

namespace Ronnytorresmtz\Comments;

use Laravel\Nova\ResourceTool;

class Comments extends ResourceTool
{
    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return 'Comments';
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return 'comments';
    }

    public function per_page($per_page)
    {
        return $this->withMeta(['per_page' => $per_page]);
    }

    public function showOnlyMyComments($value = true)
    {
        return $this->withMeta(['showOnlyMyComments' => $value]);
    }



}
