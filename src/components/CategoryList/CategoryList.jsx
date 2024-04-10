export const NodeService = {
  getTreeNodesData() {
    return [
      {
        key: "0",
        label: "Restaurants",
        data: "Restaurants Folder",
        children: [
          {
            key: "0-0",
            label: "Restaurant gastronomique",
            data: "Restaurant gastronomique",
          },
          {
            key: "0-1",
            label: "Sushi",
            data: "Sushi",
          },
        ],
      },
      {
        key: "1",
        label: "Sports",
        data: "Sports Folder",
        children: [
          {
            key: "1-0",
            label: "Golf",
            data: "Golf",
          },
          {
            key: "1-1",
            label: "Piscine",
            data: "Piscine",
          },
        ],
      },
      {
        key: "2",
        label: "Enfants",
        data: "Enfants Folder",
        children: [
          {
            key: "2-0",
            label: "Zoo",
            data: "Zoo",
          },
          {
            key: "2-1",
            label: "Cirque",
            data: "Cirque",
          },
        ],
      },
    ];
  },

  getTreeNodes() {
    return Promise.resolve(this.getTreeNodesData());
  },
};
