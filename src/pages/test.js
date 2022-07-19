import React from "react";
import { gData } from "../util/data.js";
import Tree from "rc-tree";
import { useState } from "react";
import "./text.css";

function allowDrop({ dropNode, dropPosition }) {
  if (!dropNode.children) {
    if (dropPosition === 0) return false;
  }
  return true;
}

function Demo() {
  const [data, setData] = useState(gData);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [expandedKeys, setExpandedKeys] = useState([
    "0-0-key",
    "0-0-0-key",
    "0-0-0-0-key",
  ]);

  const onDragStart = (info) => {
    console.log("start", info);
  };

  const onDragEnter = () => {
    console.log("enter");
  };

  const onDrop = (info) => {
    console.log("drop", info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };

    const dataTree = [...data];

    let dragObj;
    loop(dataTree, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (dropPosition === 0) {
      loop(dataTree, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(dataTree, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setData(dataTree);
  };

  const onExpand = (expandedKeys) => {
    console.log("onExpand", expandedKeys);
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  return (
    <div className="draggable-demo">
      <h2>Draggable with allow drop</h2>
      <div className="draggable-container">
        <Tree
          allowDrop={allowDrop}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
          autoExpandParent={autoExpandParent}
          draggable
          onDragStart={onDragStart}
          onDrop={onDrop}
          treeData={data}
        />
      </div>
    </div>
  );
}

export default Demo;
