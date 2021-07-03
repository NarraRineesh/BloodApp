import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {
array=[
  {
    question: " What is Data Structure?",
    answer: "Data structure is a fundamental concept of any programming language, essential for algorithmic design."
  },
  {
    question: " What is Data Structure?",
    answer: "Data structure is a fundamental concept of any programming language, essential for algorithmic design."
  },
  {
    question: " What is Data Structure?",
    answer: "Data structure is a fundamental concept of any programming language, essential for algorithmic design."
  }
]
  constructor() { }

  ngOnInit(): void {
  }

}
