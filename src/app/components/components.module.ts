import {NgModule } from '@angular/core';
import { ExpandableComponent } from './expandable/expandable.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [ExpandableComponent, ImagePickerComponent],
    imports: [CommonModule, IonicModule],
    exports: [ExpandableComponent, ImagePickerComponent]
})

export class ComponentsModule {}
