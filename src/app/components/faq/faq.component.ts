import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {
array=[
  {
    question: "Is it safe to give blood?  ",
    answer: "Yes. Donating blood is safe. The supplies used to collect blood are sterile and only used once."
  },
  {
    question: "Are there age limits for blood donors?",
    answer: "Each state sets the minimum blood donor age. You must be at least 16 or 17-years-old depending on your state. Some blood centers may have an upper age limit."
  },
  // {
  //   question: "Will recent vaccinations make me ineligible to donate blood?",
  //   answer: "Recent vaccinations may prevent you from donating blood. Flu vaccines do no make you ineligible."
  // },
  {
    question: 'How much blood do I have in my body?',
    answer:'Women have about 10 pints, and men about 12 pints of blood in their bodies'
  },
  {
    question: 'Is it safe to receive blood?',
    answer:'The blood supply is safe. Blood donor eligibility standards, individual donor screening, laboratory testing, and donor record checks are in place at donor centers to help ensure the safety of blood transfusions'
  },
  {
    question: 'What is plasma?',
    answer:'Plasma - the liquid portion of your blood that transports water and nutrients to your body tissues'
  }
]
  constructor() { }
  ngOnInit(): void {
   
  }

}
