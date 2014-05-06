package com.cognizant.mobile.mymobile.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	@RequestMapping(value = "/home")
	public ModelAndView homePage(Model model, HttpServletResponse response)
			throws IOException {
		ModelAndView modelAndView = new ModelAndView("home");
		modelAndView.addObject("isPayM", Boolean.TRUE);
		
		return modelAndView;
	}	
}
