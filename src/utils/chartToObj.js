import axios from "axios";

const chartToObj = (chart) => {
    
    const title = window.localStorage.getItem('title')
    const description = window.localStorage.getItem('description')
    const nodes = chart.nodes;
    const links = chart.links;
    axios.post('/blog/post', {title, description, nodes, links})
    // Object.keys(nodes).forEach(nodeKey => {
        //     console.log(nodes[nodeKey]) 
        // })
        
        // Object.keys(links).forEach(linkKey => {
            //     nodes[links[linkKey].from.nodeId].ports[links[linkKey].from.portId].to = links[linkKey].to.nodeId;
            // })
            
            console.log("------------",chart.nodes,chart.links, window.localStorage.getItem('title'), window.localStorage.getItem('description'));
    console.log(nodes);
}

export default chartToObj;