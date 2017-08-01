package com.sqli.rhquizz.Controller;

import com.sqli.rhquizz.entities.Theme;
import com.sqli.rhquizz.repository.ThemeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by nhingan on 30/06/2017.
 */
@RestController
@RequestMapping("/themes")
public class ThemeController
{
    private ThemeRepository themeRepository;

    public ThemeController(ThemeRepository themeRepository){this.themeRepository = themeRepository;}

    @GetMapping("/all")
    public List<Theme> getAll()
    {
       List<Theme> themes =  this.themeRepository.findAll();

       return themes;
    }



}
