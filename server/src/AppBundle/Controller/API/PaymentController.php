<?php

namespace AppBundle\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest; // alias pour toutes les annotations
use AppBundle\Entity\Commande;

class PaymentController extends Controller
{

    /**
     * @Rest\View()
     * @Rest\Post("/payment")
     */
  public function paymentAction(Request $request)
  {
    dump($request->request->all());
    $commande = $request->request->get('commande');

    // Check Commande validity and save it

    //
    $product = new Product();
    $form = $this->createForm(ProductType::class, $product);

    $form->submit($request->request->all());
    return $commande;
    // // Set your secret key: remember to change this to your live secret key in production
    // // See your keys here: https://dashboard.stripe.com/account/apikeys
    // \Stripe\Stripe::setApiKey("sk_test_2WXwdMC6Qwystzz38ht6kFck"); //TEST secret

    // // Token is created using Stripe.js or Checkout!
    // // Get the payment token ID submitted by the form:
    // $token = $_POST['stripeToken'];

    // // Charge the user's card:
    // $charge = \Stripe\Charge::create(array(
    //   "amount" => 1000,
    //   "currency" => "usd",
    //   "description" => "Example charge",
    //   "source" => $token,
    //   ));
  }

}
