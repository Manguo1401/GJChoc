<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * EcommerceConfig
 *
 * @ORM\Table(name="ecommerce_config")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EcommerceConfigRepository")
 */
class EcommerceConfig
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="tva", type="integer")
     */
    private $tva;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set tva
     *
     * @param integer $tva
     *
     * @return EcommerceConfig
     */
    public function setTva($tva)
    {
        $this->tva = $tva;

        return $this;
    }

    /**
     * Get tva
     *
     * @return int
     */
    public function getTva()
    {
        return $this->tva;
    }
}

