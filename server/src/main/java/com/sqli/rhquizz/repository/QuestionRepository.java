package com.sqli.rhquizz.repository;


import com.sqli.rhquizz.entities.Question;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


/**
 * Created by nhingan on 26/06/2017.
 */

//CRUD (DAO)
@RepositoryRestResource(collectionResourceRel ="question", path ="questions")
public interface QuestionRepository extends MongoRepository<Question, String> {




}

