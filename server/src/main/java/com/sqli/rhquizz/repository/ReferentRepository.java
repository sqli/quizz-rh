package com.sqli.rhquizz.repository;

import com.sqli.rhquizz.entities.Referent;


import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;


/**
 * Created by nhingan on 26/06/2017.
 */

//CRUD (DAO)
@RepositoryRestResource(collectionResourceRel = "referent", path = "referents")
public interface ReferentRepository extends MongoRepository<Referent, String> {


    //Referent findById(String id);

    //??? Referent findOne(ID id)throws IllegalArgumentException ;


}

