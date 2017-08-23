<?php

// src/AppBundle/Admin/BlogPostAdmin.php
namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper; //pour configureDatagridFilters

class ProductAdmin extends AbstractAdmin
{
    //Structure des blocks et définition des champs pour la création, l'affichage de l'element et son édition.
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('Content', ['class' => 'col-md-9'])
                ->add('name', 'text')
                ->add('description', 'textarea')
                ->add('price','number')
                ->add('unity','text')
                ->add('stock','integer')
                ->add('placement','integer')
                ->add('imageFile', 'file')
            ->end()
            // NOT Work on edit liste of categories
            ->with('Category', array('class' => 'col-md-9'))
                // ->add('categories', 'entity', array(
                //     'class' => 'AppBundle\Entity\Category',
                //     'choice_label' => 'category',
                //     'multiple' => true
                // ))
                ->add('categories', 'sonata_type_model', [
                    'class' => 'AppBundle\Entity\Category',
                    'property' => 'category',
                    'multiple' => true,
                    'btn_add' => false
                ])
                // ->add('categories', CollectionType::class, array(
                //     'entry_type'   => CategoryType::class,
                //     'allow_add'    => true,
                // ))
            ->end()
        ;
    }

    //Données définies pour l'affichage de la liste des éléments
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
        ->addIdentifier('id')
            ->addIdentifier('name')
            ->add('price')
            ->add('unity')
            ->add('stock')
            ->add('categories', null, array(
                    'associated_property' => 'category')
            )
            // ->add('categories', 'entity', array(
            //         'class' => 'AppBundle\Entity\Category',
            //         'choice_label' => 'category',
            //         'multiple' => true))
        ;
    }

    //Ajout de filtre dans l'affichage de la liste des éléments
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('name')
            ->add('price')
            ->add('unity')
            ->add('stock')
            // ->add('category', null, array(), 'entity', array(
            //     'class'    => 'AppBundle\Entity\Category',
            //     'choice_label' => 'category', // In Symfony2: 'property' => 'name'
            // ))
            ;
    }

    // Pour information, la fonction add utilisé dans l'admin reçoit 5 arguments:
    // public function add(
    //     $name,

    //     // filter
    //     $type = null,
    //     array $filterOptions = array(),

    //     // field
    //     $fieldType = null,
    //     $fieldOptions = null
    // )

    // Override du message de création par un texte souhaité (plus lisible: Item "Produit" has been successfully created.)
    public function toString($object)
    {
        return $object instanceof Product
            ? $object->getTitle()
            : 'Produit'; // shown in the breadcrumb on the create view
    }


}
