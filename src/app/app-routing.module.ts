import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeGraphComponent } from './tree-graph/tree-graph.component';

const routes: Routes = [
  { path: 'tree', component: TreeGraphComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
