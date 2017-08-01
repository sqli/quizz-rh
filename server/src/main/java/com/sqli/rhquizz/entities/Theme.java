package com.sqli.rhquizz.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;

/**
 * Created by nhingan on 26/06/2017.
 */

@Document
public class Theme
{
    @Id
    private String  id;

    private String name;
    private String logo;
    //permet de faire reference a un objet de type référent(relation)
    @DBRef
    private Referent referent;
    @DBRef
    private List<Question> questions;


    // getter / setter*************************



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Referent getReferent() {
        return referent;
    }

    public void setReferent(Referent referent) {
        this.referent = referent;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
