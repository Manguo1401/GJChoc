<?php

namespace AppBundle\Controller\Admin;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations as Rest;

class CommandeController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @Rest\View()
     * @Rest\Get("/posts")
     */
    public function getAction()
    {
        return $this->getDoctrine()->getRepository('AppBundle:Post')->findAll();
    }
}
