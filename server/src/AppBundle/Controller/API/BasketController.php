<?php

namespace AppBundle\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest; // alias pour toutes les annotations

class BasketController extends Controller
{
    /**
     * @Rest\View()
     * @Rest\Put("/basket/add/{productid}/{qte}", defaults={"qte" = 1})
     */
    public function addAction(Request $request)
    {
      $session = $request->getSession();

      if(!$session->has('basket'))
        $session->set('basket', array());

      $basket = $session->get('basket', array());

      //$basket[ID produit] => Quantité

      if(array_key_exists($id, $basket))
      {
        if($request->get('qte')!=null)
          $basket[$productid] = $request->get('qte');
      }
      else
      {
        $basket[$productid] = $request->get('qte'); //1 by default
      }

      $session->set('basket', $basket);

        //return $this->getDoctrine()->getRepository('AppBundle:Post')->findAll();
    }

    /**
     * @Rest\View()
     * @Rest\Get("/basket/products")
     */
    public function getPanier(Request $request)
    {
      $products = array();
      if($session->has('basket'))
        //$basket = $session->get('basket', array());
        $products = $this->getDoctrine()->getRepository('AppBundle:Product')
                        ->findArray(array_keys($request->getSession()->get('basket')));

      return $products;
    }

}
