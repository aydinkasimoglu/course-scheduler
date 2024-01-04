class Graph {
  adjacencyList: Map<number, number[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node: number) {
    this.adjacencyList.set(node, []);
  }

  addEdge(node1: number, node2: number) {
    this.adjacencyList.get(node1)?.push(node2);
    this.adjacencyList.get(node2)?.push(node1);
  }
}

class CourseScheduler {
  graph: Graph;

  constructor() {
    this.graph = new Graph();
  }

  scheduleCourses(): Map<number, number> {
    const colors: Map<number, number> = new Map();
    const nodes = Array.from(this.graph.adjacencyList.keys());

    for (const node of nodes) {
      const adjacentColors = new Set<number>();
      const neighbors = this.graph.adjacencyList.get(node);

      if (neighbors) {
        for (const neighbor of neighbors) {
          if (colors.has(neighbor)) {
            adjacentColors.add(colors.get(neighbor)!);
          }
        }
      }

      const color = this.getAvailableColor(adjacentColors);
      colors.set(node, color);
    }

    return colors;
  }

  private getAvailableColor(adjacentColors: Set<number>): number {
    for (let color = 1; ; color++) {
      if (!adjacentColors.has(color)) {
        return color;
      }
    }
  }
}

const scheduler = new CourseScheduler();

export default scheduler;
