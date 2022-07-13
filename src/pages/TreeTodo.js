import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../component/Loading";
import { order_detail } from "../redux/action/product";
import axios from "axios";
import { DOMAIN } from "../redux/constant";
import { Box } from "@mui/material";
const datatree = {
  parent_id: "root",
  title: "Parent",
  items: [
    {
      end_date: "Tue Jul 26 2022 00:00:00 GMT+0700 (Indochina Time)",
      start_date: "2022-7-13 10:27:16",
      description: "Name",
      status: "Done",
      title: "Name Name",
      parent_id: 49,
      items: [
        {
          parent_id: "4",
          title: "Child - 4",
        },
        {
          parent_id: "5",
          title: "Child - 5",
          items: [
            {
              parent_id: "6",
              title: "Child - 6",
            },
            {
              parent_id: "7",
              title: "Child - 7",
              items: [
                {
                  parent_id: "2",
                  title: "Child - 2",
                },
                {
                  parent_id: "3",
                  title: "Child - 3",
                  items: [
                    {
                      parent_id: "8",
                      title: "Child - 8",
                    },
                    {
                      parent_id: "9",
                      title: "Child - 9",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      end_date: "Sun Jul 31 2022 00:00:00 GMT+0700 (Indochina Time)",
      start_date: "2022-7-13 10:21:48",
      description: "aaaaaccc",
      status: "Done",
      title: "aaaaaccc",
      parent_id: 85,
    },
    {
      end_date: "Sun Jul 31 2022 00:00:00 GMT+0700 (Indochina Time)",
      start_date: "2022-7-13 10:21:48",
      description: "aaaaaccc",
      status: "Done",
      title: "aaaaaccc",
      parent_id: 48,
      items: [
        {
          parent_id: "14",
          title: "Child - 14",
        },
        {
          parent_id: "15",
          title: "Child - 15",
          items: [
            {
              parent_id: "16",
              title: "Child - 16",
            },
            {
              parent_id: "17",
              title: "Child - 17",
            },
          ],
        },
      ],
    },
  ],
};

export default function TreeTodo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log("data", data);

  /* Effect Loading Page */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  /* Effect Get All Products */
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const dataProduct = await axios.get(`${DOMAIN}/Products`);
    setData(dataProduct.data);
  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.parent_id} nodeId={nodes.parent_id} label={nodes.title}>
      {Array.isArray(nodes.items)
        ? nodes.items.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ width: "1000px", margin: "auto", mt: 5 }}>
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 110, flexGrow: 1 }}
          >
            {renderTree(datatree)}
          </TreeView>
          {/*<TreeView
            aria-label="multi-select"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            multiSelect
            sx={{ height: "10000px", flexGrow: 1, maxWidth: "1000px" }}
          >
            <TreeItem nodeId="1" label="Title">
              {data?.map((item) => {
                return <TreeItem nodeId={item.id} label={item.title} />;
              })}
            </TreeItem>
            <TreeItem nodeId="2" label="Description">
              {data?.map((item) => {
                return <TreeItem nodeId={item.id} label={item.description} />;
              })}
            </TreeItem>
            <TreeItem nodeId="3" label="Status">
              {data?.map((item) => {
                return <TreeItem nodeId={item.id} label={item.status} />;
              })}
            </TreeItem>
            <TreeItem nodeId="4" label="Start Date">
              {data?.map((item) => {
                return <TreeItem nodeId={item.id} label={item.start_date} />;
              })}
            </TreeItem>
            <TreeItem nodeId="5" label="End Date">
              {data?.map((item) => {
                return <TreeItem nodeId={item.id} label={item.end_date} />;
              })}
            </TreeItem>
            <TreeItem nodeId="6" label="Parent"></TreeItem>
          </TreeView>*/}
        </Box>
      )}
    </>
  );
}
