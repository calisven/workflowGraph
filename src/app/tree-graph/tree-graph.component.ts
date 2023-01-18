import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { DagreNodesOnlyLayout } from './customDagreNodesOnly';

export class Employee {
  id!: string;
  name!: string;
  office!: string;
  role!: string;
  backgroundColor!: string;
  upperManagerId?: string;
}

@Component({
  selector: 'app-tree-graph',
  templateUrl: './tree-graph.component.html',
  styleUrls: ['./tree-graph.component.scss']
})
export class TreeGraphComponent implements OnInit {


  // @HostListener('contextmenu', ['$event'])
// onRightClick(event: any) {
//   // event.preventDefault();
// }

  @Input() employees: Employee[] = [];

  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: 'TB'
  };

  public items: any[] = [];
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor() {
    this.employees = [
      {
        id: '1',
        name: 'Employee 1',
        office: 'Office 1',
        role: 'Manager',
        backgroundColor: '#DC143C'
      },
      {
        id: '2',
        name: 'Employee 2',
        office: 'Office 2',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1'
      },
      {
        id: '3',
        name: 'Employee 3',
        office: 'Office 3',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1'
      },
      {
        id: '4',
        name: 'Employee 4',
        office: 'Office 4',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1'
      },
      {
        id: '5',
        name: 'Employee 5',
        office: 'Office 5',
        role: 'Student',
        backgroundColor: '#8A2BE2',
        upperManagerId: '4'
      }
    ];
  }

  public ngOnInit(): void {
    this.copyItems();
    for (const employee of this.employees) {
      const node: Node = {
        id: employee.id,
        label: employee.name,
        data: {
          office: employee.office,
          role: employee.role,
          backgroundColor: employee.backgroundColor
        }
      };

      this.nodes.push(node);

    }

    for (const employee of this.employees) {
      if (!employee.upperManagerId) {
        continue;
      }

      const edge: Edge = {
        source: employee.upperManagerId,
        target: employee.id,
        label: '',
        data: {
          linkText: 'Manager of'
        }
      };

      this.links.push(edge);
    }

  }

  public copyItems() {
    this.items = [
      {
          label: 'File',
          items: [{
                  label: 'New', 
                  icon: 'pi pi-fw pi-plus',
                  items: [
                      {label: 'Project'},
                      {label: 'Other'},
                  ]
              },
              {label: 'Open'},
              {label: 'Quit'}
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      }
  ];
  
  }

  public onContext () {
    console.log('jaja')
  }

  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor
    };
  }
}
