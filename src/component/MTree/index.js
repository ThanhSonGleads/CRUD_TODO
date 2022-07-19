import Tree from "rc-tree";
import "rc-tree/assets/index.css"
import React, { useEffect, useState, useMemo } from "react";
import {Box} from "@mui/material";

const Index = ({ treeData = [], treeNode, treeStyle, search, ...props }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(loop(treeData));
    }, [JSON.stringify(treeData), search])

    const loop = data =>
        data.map(item => {
            if (item.children) {
                return {
                    ...item,
                    key: item.id,
                    title: treeNode(item),
                    children: loop(item.children)
                };
            }
            return {
                ...item,
                key: item.id,
                title: treeNode(item)
            };
        });

    const motion = useMemo(() => {
        return {
            motionName: 'node-motion',
            motionAppear: false,
            onAppearStart: () => ({ height: 0 }),
            onAppearActive: node => ({ height: node.scrollHeight }),
            onLeaveStart: node => ({ height: node.offsetHeight }),
            onLeaveActive: () => ({ height: 0 }),
        };
    }, [])

    return (
        <>
            <Box
                sx={{
                    "& .rc-tree-node-selected": {
                        backgroundColor: "transparent !important",
                        boxShadow: '0 0 0 1px transparent !important'
                    },
                    "& .rc-tree-node-selected .rc-tree-title .node-title": {
                        backgroundColor: "rgb(186 231 255)",
                    },
                    "& .rc-tree .drop-target": {
                        backgroundColor: "transparent !important"
                    },
                    "& .rc-tree-node-content-wrapper>div": {
                        backgroundColor: "transparent !important",
                        position: "relative",
                        height: "1px",
                        zIndex: 9,
                        borderBottom: "2px solid rgb(24 144 255) !important"
                    },
                    "& .rc-tree .rc-tree-treenode span.rc-tree-iconEle": {
                        display: 'none'
                    },
                    "& .rc-tree .rc-tree-treenode.drag-over .rc-tree-node-content-wrapper  .node-title": {
                        background: "rgb(170 205 247)"
                    },
                    "& .rc-tree-treenode": {
                        display: 'flex',
                        alignItems: 'center'
                    },
                    "& .rc-tree-title": {
                        position: 'relative'
                    },
                    "& .rc-tree .rc-tree-treenode": {
                        background: 'transparent !Important'
                    },
                    "& .rc-tree .rc-tree-treenode .rc-tree-node-content-wrapper": {
                        height: "initial",
                        width: "100%"
                    },
                    "& .rc-tree-treenode:hover .btn-tree": {
                        opacity: 1,
                        right: '-70px'
                    },
                    "& .rc-tree-child-tree": {
                        display: "block"
                    },
                    "& .node-motion": {
                        transition: "all .3s",
                        overflowY: "hidden"
                    },
                    ...treeStyle
                }}
            >
                <Tree
                    {...props}
                    treeData={data}
                    motion={motion}
                >
                </Tree>
            </Box>
        </>
    );
}

export default React.memo(Index);
