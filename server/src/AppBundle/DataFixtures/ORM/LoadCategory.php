<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Category;
use AppBundle\Entity\Type;

class LoadCategory implements FixtureInterface
{
   public function load(ObjectManager $manager)
   {
      $typeChocolats = $this->get('doctrine.orm.entity_manager')
        ->getRepository('AppBundle:Type')
        ->findOneBy(array('type' => 'Chocolats'));

      $category1 = new Category();
      $category1->setCategory('Les assortiments de chocolats');
      $category1->setDescription('Description assortiments de chocolats');
      $category1->setType($typeChocolats);

      $category2 = new Category();
      $category2->setCategory('Les buissons');
      $category2->setDescription('Description buissons');
      $category2->setType($typeChocolats);

      $category3 = new Category();
      $category3->setCategory('Les mendiants');
      $category3->setDescription('Description mendiants');
      $category3->setType($typeChocolats);

      $category4 = new Category();
      $category4->setCategory('Les orangettes & citronettes');
      $category4->setDescription('Description orangettes & citronettes');
      $category4->setType($typeChocolats);

      $typeConfiseries = $this->get('doctrine.orm.entity_manager')
        ->getRepository('AppBundle:Type')
        ->findOneBy(array('type' => 'Confiseries'));

      $category5 = new Category();
      $category5->setCategory('Les berlingots');
      $category5->setDescription('Description berlingots');
      $category5->setType($typeConfiseries);

      $category6 = new Category();
      $category6->setCategory('Les guimauves');
      $category6->setDescription('Description guimauves');
      $category6->setType($typeConfiseries);

      $category7 = new Category();
      $category7->setCategory('Les nougats');
      $category7->setDescription('Description nougats');
      $category7->setType($typeConfiseries);

      $category8 = new Category();
      $category8->setCategory('Les pâtes de fruits');
      $category8->setDescription('Description pâtes de fruits');
      $category8->setType($typeConfiseries);

      $manager->persist($category1);
      $manager->persist($category2);
      $manager->persist($category3);
      $manager->persist($category4);
      $manager->persist($category5);
      $manager->persist($category6);
      $manager->persist($category7);
      $manager->persist($category8);

      $manager->flush();
   }
}
