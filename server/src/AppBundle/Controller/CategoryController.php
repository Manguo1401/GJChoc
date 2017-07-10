<?php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest; // alias pour toutes les annotations
use AppBundle\Form\Type\CategoryType;
use AppBundle\Entity\Category;

/** INFO dev: AUTO au lieu de @ permet d'indiquer que Rest fait deja le taf
* Mais ici y se transforme en ie au pluriel, ce qui n'est pas le fonctionnement automatique de Rest, donc on garde les info routage
*/
class CategoryController extends Controller
{
    /**
     * @Rest\View()
     * @Rest\Get("/categories")
     */
    public function getCategoriesAction(Request $request)
    {
        $categories = $this->get('doctrine.orm.entity_manager')
        ->getRepository('AppBundle:Category')
        ->findAll();
        /* @var $category Category[] */

        return $categories;
    }

    /**
     * @Rest\View()
     * @Rest\Get("/categories/{id}")
     */
    public function getCategoryAction(Request $request)
    {
        $category = $this->get('doctrine.orm.entity_manager')
        ->getRepository('AppBundle:Category')
        ->find($request->get('id'));
        /* @var $category Category */

        if (empty($category)) {
            return new JsonResponse(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        return $category;
    }


    /**
     * @Rest\View(statusCode=Response::HTTP_CREATED)
     * @Rest\Post("/categories")
     */
    public function postCategoriesAction(Request $request)
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);

        $form->submit($request->request->all()); // Validation des données

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($category);
            $em->flush();
            return $category;
        } else {
            return $form;
        }
    }

//     /** POST category basic */
//     /**
//      * @Rest\View(statusCode=Response::HTTP_CREATED)
//      * @Rest\Post("/categories")
//      */
//     public function postCategoriesAction(Request $request)
//     {
//         $category = new Category();
//         $category->setName($request->get('name'))
//             ->setPricekg($request->get('pricekg'))
//             ->setStock($request->get('stock'))
//             ->setDescription($request->get('description'));

//         $em = $this->get('doctrine.orm.entity_manager');
//         $em->persist($category);
//         $em->flush();

//         return $category;
//     }

    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/categories/{id}")
     */
    public function removeCategoryAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $category = $em->getRepository('AppBundle:Category')
                    ->find($request->get('id'));
        /* @var $product Category */

        if ($category) {
            $em->remove($category);
            $em->flush();
        }
    }

    /**
     * @Rest\View()
     * @Rest\Put("/categories/{id}")
     */
    public function updateCategoryAction(Request $request)
    {
        return $this->updateCategory($request, true);
    }

    /**
     * @Rest\View()
     * @Rest\Patch("/categories/{id}")
     */
    public function patchCategoryAction(Request $request)
    {
        return $this->updateCategory($request, false);
    }

    private function updateCategory(Request $request, $clearMissing)
    {
        $category = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Category')
                ->find($request->get('id')); // L'identifiant en tant que paramètre n'est plus nécessaire
        /* @var $category Category */

        if (empty($category)) {
            //return new JsonResponse(['message' => 'Product not found'], Response::HTTP_NOT_FOUND);
            return categoryNotFound();
        }

        $form = $this->createForm(CategoryType::class, $category);

        // Le paramètre false dit à Symfony de garder les valeurs dans notre
        // entité si l'utilisateur n'en fournit pas une dans sa requête
        $form->submit($request->request->all(), $clearMissing);

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($category);
            $em->flush();
            return $category;
        } else {
            return $form;
        }
    }

    private function categoryNotFound()
    {
        return \FOS\RestBundle\View\View::create(['message' => 'Category not found'], Response::HTTP_NOT_FOUND);
    }
}
