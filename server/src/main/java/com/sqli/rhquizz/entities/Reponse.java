package com.sqli.rhquizz.entities;

/**
 * Created by nhingan on 26/06/2017.
 */
public class Reponse
{
    //attribut
    private String text;
    private String code;
    private boolean isTrue;

    // getter / setter ********************



    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCode() { return code;}

    public void setCode(String code) {
        this.code = code;
    }

    public boolean getIsTrue() { return isTrue; }

    public void setIsTrue(Boolean isTrue) {
        this.isTrue = isTrue;
    }




}
