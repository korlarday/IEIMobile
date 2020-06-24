import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentHistoryModel } from 'src/app/services/models';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  @Input() from: Date;
  @Input() to: Date;
  @Input() payments: Array<PaymentHistoryModel>;
  @Input() totalContributions: number;
  @Input() netContributions: number;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClose() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
