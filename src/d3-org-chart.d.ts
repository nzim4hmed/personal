declare module 'd3-org-chart' {
    export class OrgChart {
      // Define the methods and properties used from OrgChart
      constructor();
  
      container(value: HTMLElement | null): OrgChart;
      data(value: any): OrgChart;
      nodeWidth(value: (d: any) => number): OrgChart;
      nodeHeight(value: (d: any) => number): OrgChart;
      childrenMargin(value: (d: any) => number): OrgChart;
      compactMarginBetween(value: (d: any) => number): OrgChart;
      compactMarginPair(value: (d: any) => number): OrgChart;
      nodeContent(value: (d: any) => string): OrgChart;
      render(): OrgChart;
      onNodeClick(callback: (d: any) => void): OrgChart;
      update(data: any): OrgChart;
      root(): any;
    }
  }

// declare module 'd3-org-chart' {
//     export class OrgChart {
//       constructor();
  
//       container(value: HTMLElement | null): OrgChart;
//       data(value: any): OrgChart;
//       nodeWidth(value: (d: any) => number): OrgChart;
//       nodeHeight(value: (d: any) => number): OrgChart;
//       childrenMargin(value: (d: any) => number): OrgChart;
//       compactMarginBetween(value: (d: any) => number): OrgChart;
//       compactMarginPair(value: (d: any) => number): OrgChart;
//       nodeContent(value: (d: any) => string): OrgChart;
//       render(): OrgChart;
//     }
//   }

// declare module 'd3-org-chart' {
//     export default class OrgChart {
//       constructor();
  
//       container(value: HTMLElement | null): OrgChart;
//       data(value: any): OrgChart;
//       nodeWidth(value: (d: any) => number): OrgChart;
//       nodeHeight(value: (d: any) => number): OrgChart;
//       childrenMargin(value: (d: any) => number): OrgChart;
//       compactMarginBetween(value: (d: any) => number): OrgChart;
//       compactMarginPair(value: (d: any) => number): OrgChart;
//       nodeContent(value: (d: any) => string): OrgChart;
//       render(): OrgChart;
//       onNodeClick(callback: (d: any) => void): OrgChart;
//       update(data: any): OrgChart;
//       root(): any;
//     }
//   }

// import * as d3 from 'd3';
// declare module 'd3-org-chart' {
//     export default class OrgChart {
//       constructor();
  
//       container(value: HTMLElement | null): OrgChart;
//       data(value: any): OrgChart;
//       nodeWidth(value: (d: any) => number): OrgChart;
//       nodeHeight(value: (d: any) => number): OrgChart;
//       childrenMargin(value: (d: any) => number): OrgChart;
//       compactMarginBetween(value: (d: any) => number): OrgChart;
//       compactMarginPair(value: (d: any) => number): OrgChart;
//       nodeContent(value: (d: any) => string): OrgChart;
//       render(): OrgChart;
//       onNodeClick(callback: (d: any) => void): OrgChart;
//       update(data: any): OrgChart;
//       root(): any;
//     }
//   }
  

  
  