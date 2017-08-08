package com.sqli.rhquizz.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.sqli.rhquizz.entities.Theme;



/**
 * Created by nhingan on 26/06/2017.
 */

//CRUD (DAO)
@RepositoryRestResource(collectionResourceRel = "theme", path = "themes")
public interface ThemeRepository extends MongoRepository<Theme, String> {



}
