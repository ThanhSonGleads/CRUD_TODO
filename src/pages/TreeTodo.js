import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { array } from "yup/lib/locale";
import axios from "axios";
import { DOMAIN } from "../redux/constant";

export default function MUI() {

  const [dataTree, setDataTree] = useState([]);

  /*Effect Get All Data Products */
  useEffect(() => {
    handleGetDataProducts()
  }, []);
  
  const handleGetDataProducts = async () => {
    const data = await axios.get(`${DOMAIN}/Products`)
    setDataTree(data.data)
  };
  
  const renderTreeItem = (node) => (
    <TreeItem key={node.id} nodeId={node.id} label={node.title}>
      {Array.isArray(node.items)
        ? node.items.map((node) => renderTreeItem(node))
        : null}
    </TreeItem>
  );

  const renderTree = (nodes) => {
    return nodes.map((item) => {
      return (
        <TreeItem key={item.id} nodeId={item.id} label={item.title}>
            {/* Check item.items Is An Array */}
          {Array.isArray(item.items)
            ? item.items.map((node) => renderTreeItem(node))
            : null}
        </TreeItem>
      );
    });
  };

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, mt: 15, ml: 15 }}
    >
      {renderTree(dataTree)}
    </TreeView>
  );
}
