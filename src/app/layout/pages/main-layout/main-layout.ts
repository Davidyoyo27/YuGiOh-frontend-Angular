import { Component } from '@angular/core';
import { Sidebar } from "../../components/sidebar/sidebar";
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-main-layout',
  imports: [Sidebar, RouterOutlet, Navbar, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
