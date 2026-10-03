(() => {
  "use strict";
  const cases = window.ICT450_ERD_CASES || [];
  const byId = new Map(cases.map(item => [item.id,item]));
  const app = document.getElementById("app");
  const nav = document.getElementById("sideNav");
  const esc = value => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");
  const marked = value => esc(value).replace(/\[\[([earcb]):([^\]]+)\]\]/g,(_,kind,phrase)=>`<mark class="hl ${kind}">${phrase}</mark>`);
  const slug = new URLSearchParams(location.search).get("case");
  const active = byId.get(slug);
  const stageNames = ["Entities","Attributes","First connections","More connections","Cardinality","Complete model"];
  const instructorDraft = Boolean(window.ICT450_ERD_INSTRUCTOR_DRAFT);
  const homeHref = instructorDraft ? "index.html" : "past-examination-erd.html";

  function home(){
    document.title="Past Examination ERD Worked Examples";
    app.innerHTML=instructorDraft
      ? `<div class="hero"><p class="eyebrow">ICT450 · instructor reference</p><h1>ERD Guide Reference Copies</h1><p>Question-led models with their source-dependent design choices recorded.</p></div><div class="content"><div class="intro-note">The lecturer has accepted these worked interpretations for now. They are not university answer schemes; proposed details remain labelled.</div><div class="case-grid">${cases.map(c=>`<article class="case-card"><h2><a href="?case=${c.id}">${esc(c.session)} · ${esc(c.title)}</a></h2><p>Original question · six focused diagram stages · completed model</p><span class="status">Lecturer-approved worked example</span></article>`).join("")}</div></div>`
      : `<div class="hero"><p class="eyebrow">ICT450 · worked examples</p><h1>Past Examination ERD Questions</h1><p>Read each question, identify its business rules, and assemble a connected Crow's Foot model step by step.</p></div><div class="content"><div class="case-grid">${cases.map(c=>`<article class="case-card"><h2><a href="?case=${c.id}">${esc(c.session)} · ${esc(c.title)}</a></h2><p>Question 5 · six diagram stages</p></article>`).join("")}<article class="case-card"><h2><a href="A%20Beginner's%20Guide%20to%20Building%20an%20ERD%20from%20Business%20Rules.html">July 2026 · Student Merit Activities</a></h2><p>Question 5 · seven diagram stages</p></article></div></div>`;
    nav.innerHTML="";
    const toggle=document.querySelector?.(".quick-nav-toggle");if(toggle)toggle.hidden=true;
  }

  // Match the introductory guide: entity dimensions follow their content,
  // while neighbouring columns and rows retain a modest connector corridor.
  const COL_GAP=110, ROW_GAP=110;
  function nodeFields(node){
    let fk=0;
    return node[1].split("|").map(raw=>{
      const match=raw.match(/^(.*?)\s+\((PK\/FK|PK|FK)\)(\*)?$/);
      if(!match)return {text:raw,key:false};
      const role=match[2]==="PK"?"PK":match[2]==="FK"?`FK${++fk}`:`PK/FK${++fk}`;
      return {text:`${role} ${match[1]}${match[3]||""}`,key:role.startsWith("PK")};
    });
  }
  const nodeSize = node => ({
    w:Math.min(250,Math.max(190,Math.ceil(node[0].length*9+30),...nodeFields(node).map(field=>Math.ceil(field.text.length*7.2+30)))),
    h:60+nodeFields(node).length*24
  });
  function layout(c){
    const cols=[...new Set(c.nodes.map(n=>n[2]))].sort((a,b)=>a-b);
    const rows=[...new Set(c.nodes.map(n=>n[3]))].sort((a,b)=>a-b);
    const colX=new Map(),rowY=new Map();let x=40,y=70;
    for(const col of cols){colX.set(col,x);x+=Math.max(...c.nodes.filter(n=>n[2]===col).map(n=>nodeSize(n).w))+COL_GAP;}
    for(const row of rows){rowY.set(row,y);y+=Math.max(...c.nodes.filter(n=>n[3]===row).map(n=>nodeSize(n).h))+ROW_GAP;}
    return new Map(c.nodes.map(n=>[n[0],{x:colX.get(n[2]),y:rowY.get(n[3]),col:cols.indexOf(n[2]),row:rows.indexOf(n[3]),...nodeSize(n)}]));
  }
  const plans=new WeakMap(),models=new WeakMap();
  // Relationship groups are tied to each written lesson. Their indices refer
  // to c.edges and do not change entity positions or the completed model.
  const stageEdgeGroups={
    feb23:[[3,4],[0,1],[2]],
    jul23:[[1,2],[3,4],[0,5]],
    jan24:[[0,1],[4,5],[2,3]],
    jul24:[[0,1,2],[3,4,5],[6,7]],
    feb25:[[0,1,2,3],[6,7,8,9,10],[4,5,11,12]],
    jul25:[[5,6,0],[1,2],[3,4]]
  };
  function stagePlan(c){
    if(plans.has(c))return plans.get(c);
    const groups=c.stageEdgeGroups || stageEdgeGroups[c.id];
    if(!groups||groups.flat().length!==c.edges.length||new Set(groups.flat()).size!==c.edges.length)
      throw new Error(`Incomplete diagram progression for ${c.id}`);
    const plan={groups,cumulative:[groups[0],groups[0].concat(groups[1]),c.edges.map((_,i)=>i)]};
    plans.set(c,plan);return plan;
  }
  function stageGraph(c,stage){
    const ids=stage<3?[]:stage===3?stagePlan(c).cumulative[0]:stage===4?stagePlan(c).cumulative[1]:stagePlan(c).cumulative[2];
    const visible=new Set(ids),connected=new Set(ids.flatMap(i=>[c.edges[i][0],c.edges[i][1]]));
    const nodes=c.nodes.filter(n=>!n[4]||connected.has(n[0]));
    return {nodes,edgeIds:ids,edges:c.edges.filter((_,i)=>visible.has(i)),fields:stage!==1&&stage!==5,symbols:stage>=3};
  }
  // Reuse the introductory guide's overlay convention: the connector itself
  // starts at the entity border, and the endpoint symbol is drawn on top.
  const GLYPH=36;
  function glyph(p,card){
    const start=`<g class="endpoint" transform="translate(${p.x} ${p.y}) rotate(${p.angle})"><line x1="0" y1="0" x2="${GLYPH}" y2="0"/>`;
    if(card==="1")return `${start}<line x1="7" y1="-8" x2="7" y2="8"/><line x1="24" y1="-8" x2="24" y2="8"/></g>`;
    if(card==="0one")return `${start}<line x1="7" y1="-8" x2="7" y2="8"/><circle cx="24" cy="0" r="5"/></g>`;
    const foot='<line x1="4" y1="-8" x2="16" y2="0"/><line x1="4" y1="8" x2="16" y2="0"/>';
    return card==="0many"?`${start}${foot}<circle cx="26" cy="0" r="5"/></g>`:`${start}${foot}<line x1="27" y1="-8" x2="27" y2="8"/></g>`;
  }
  function sideChoice(a,b){
    if(a.col===b.col&&a.row===b.row)return {from:"right",to:"top",kind:"loop"};
    if(a.row===b.row&&Math.abs(a.col-b.col)===1)return a.col<b.col?{from:"right",to:"left",kind:"horizontal"}:{from:"left",to:"right",kind:"horizontal"};
    if(a.col===b.col&&Math.abs(a.row-b.row)===1)return a.row<b.row?{from:"bottom",to:"top",kind:"vertical"}:{from:"top",to:"bottom",kind:"vertical"};
    if(a.row===b.row)return a.row===0?{from:"top",to:"top",kind:"rowDetour"}:{from:"bottom",to:"bottom",kind:"rowDetour"};
    if(a.row!==b.row&&a.col!==b.col)return a.row<b.row?{from:"bottom",to:"top",kind:"diagonal"}:{from:"top",to:"bottom",kind:"diagonal"};
    if(a.col===b.col)return {from:"right",to:"right",kind:"detour"};
    return a.col<=b.col?{from:"right",to:"left",kind:"detour"}:{from:"left",to:"right",kind:"detour"};
  }
  function port(node,side,offset){
    if(side==="right")return {x:node.x+node.w,y:node.y+node.h/2+offset,angle:0,dx:1,dy:0};
    if(side==="left")return {x:node.x,y:node.y+node.h/2+offset,angle:180,dx:-1,dy:0};
    if(side==="bottom")return {x:node.x+node.w/2+offset,y:node.y+node.h,angle:90,dx:0,dy:1};
    return {x:node.x+node.w/2+offset,y:node.y,angle:270,dx:0,dy:-1};
  }
  function portOffset(spec,end){
    const value=spec[end+"Offset"]||0;
    if(spec.choice.kind!=="diagonal"&&spec.choice.kind!=="rowDetour")return value;
    const direction=Math.sign(spec.b.col-spec.a.col);
    const node=end==="from"?spec.a:spec.b;
    return value+(end==="from"?direction:-direction)*node.w*.22;
  }
  function route(spec){
    const a=spec.a,b=spec.b,p=port(a,spec.choice.from,portOffset(spec,"from")),q=port(b,spec.choice.to,portOffset(spec,"to"));
    const sx=p.x,sy=p.y,ex=q.x,ey=q.y;
    if(spec.choice.kind==="loop"){
      const turn=a.x+a.w+64,top=a.y-54;
      return {d:`M${sx} ${sy} H${turn} V${top} H${ex} V${ey}`,p,q};
    }
    if(spec.choice.kind==="horizontal"){
      const y=spec.commonCoord;
      return {d:`M${sx} ${y} H${ex}`,p:{...p,y},q:{...q,y}};
    }
    if(spec.choice.kind==="vertical"){
      const x=spec.commonCoord;
      return {d:`M${x} ${sy} V${ey}`,p:{...p,x},q:{...q,x}};
    }
    if(spec.choice.kind==="diagonal"){
      const gap=a.row<b.row?(a.y+a.h+b.y)/2+spec.laneOffset:(b.y+b.h+a.y)/2+spec.laneOffset;
      return {d:`M${sx} ${sy} V${gap} H${ex} V${ey}`,p,q};
    }
    if(spec.choice.kind==="rowDetour"){
      const gap=a.row===0?Math.min(a.y,b.y)-45+spec.laneOffset:Math.max(a.y+a.h,b.y+b.h)+40+spec.laneOffset;
      return {d:`M${sx} ${sy} V${gap} H${ex} V${ey}`,p,q};
    }
    const channelA=spec.fromChannel,channelB=spec.toChannel;
    const gap=a.row===b.row?(a.row===0?Math.min(a.y,b.y)-45:Math.max(a.y+a.h,b.y+b.h)+40)+spec.laneOffset:
      a.row<b.row?(a.y+a.h+b.y)/2+spec.laneOffset:(b.y+b.h+a.y)/2+spec.laneOffset;
    return {d:`M${sx} ${sy} H${channelA} V${gap} H${channelB} V${ey} H${ex}`,p,q};
  }
  function edgeSpecs(graph,positions){
    const specs=graph.edges.map((edge,index)=>({edge,index,a:positions.get(edge[0]),b:positions.get(edge[1])})).filter(s=>s.a&&s.b);
    const portGroups=new Map(),laneGroups=new Map(),channelGroups=new Map();
    for(const spec of specs){
      spec.choice=sideChoice(spec.a,spec.b);
      for(const end of ["from","to"]){const id=end==="from"?spec.edge[0]:spec.edge[1],side=spec.choice[end],key=`${id}:${side}`;if(!portGroups.has(key))portGroups.set(key,[]);portGroups.get(key).push({spec,end});}
      if(spec.choice.kind==="detour"||spec.choice.kind==="diagonal"||spec.choice.kind==="rowDetour"){
        const row=spec.a.row<=spec.b.row?spec.a.row:spec.a.row-1;
        if(!laneGroups.has(row))laneGroups.set(row,[]);laneGroups.get(row).push(spec);
      }
      if(spec.choice.kind==="detour"){
        for(const end of ["from","to"]){
          const node=end==="from"?spec.a:spec.b,side=spec.choice[end],channel=side==="right"?node.col:node.col-1;
          if(!channelGroups.has(channel))channelGroups.set(channel,[]);
          channelGroups.get(channel).push({spec,end});
        }
      }
    }
    for(const group of portGroups.values())group.forEach(({spec,end},i)=>{const slot=i-(group.length-1)/2;spec[end+"Offset"]=slot*22;spec[end+"Slot"]=slot;spec[end+"Count"]=group.length;});
    for(const group of laneGroups.values()){
      group.sort((a,b)=>Math.abs(b.b.col-b.a.col)-Math.abs(a.b.col-a.a.col)||
        Math.sign(a.b.col-a.a.col||1)*((b.b.x+portOffset(b,"to"))-(a.b.x+portOffset(a,"to")))||a.index-b.index);
      group.forEach((spec,i)=>{spec.laneOffset=(i-(group.length-1)/2)*20;});
    }
    const all=[...positions.values()];
    for(const [channel,group] of channelGroups){
      const left=all.filter(p=>p.col===channel),right=all.filter(p=>p.col===channel+1);
      const centre=channel<0?20:!right.length?Math.max(...left.map(p=>p.x+p.w))+55:
        (Math.max(...left.map(p=>p.x+p.w))+Math.min(...right.map(p=>p.x)))/2;
      const step=Math.min(12,80/Math.max(1,group.length-1));
      group.forEach(({spec,end},i)=>{spec[end+"Channel"]=centre+(i-(group.length-1)/2)*step;});
    }
    // Adjacent edges get one straight shared port coordinate. Reserve the
    // detour/loop ports first, then choose a coordinate clear at BOTH boxes.
    const occupied=new Map([...portGroups.keys()].map(key=>[key,[]]));
    const portKey=(spec,end)=>`${spec.edge[end==="from"?0:1]}:${spec.choice[end]}`;
    const coordinate=(spec,end)=>{
      const node=end==="from"?spec.a:spec.b,side=spec.choice[end];
      const p=port(node,side,portOffset(spec,end));
      return side==="left"||side==="right"?p.y:p.x;
    };
    for(const spec of specs)if(spec.choice.kind==="detour"||spec.choice.kind==="diagonal"||spec.choice.kind==="rowDetour"||spec.choice.kind==="loop")
      for(const end of ["from","to"])occupied.get(portKey(spec,end)).push(coordinate(spec,end));
    for(const spec of specs)if(spec.choice.kind==="horizontal"||spec.choice.kind==="vertical"){
      const horizontal=spec.choice.kind==="horizontal";
      const low=horizontal?Math.max(spec.a.y+42,spec.b.y+42):Math.max(spec.a.x+18,spec.b.x+18);
      const high=horizontal?Math.min(spec.a.y+spec.a.h-14,spec.b.y+spec.b.h-14):Math.min(spec.a.x+spec.a.w-18,spec.b.x+spec.b.w-18);
      const desired=(coordinate(spec,"from")+coordinate(spec,"to"))/2;
      const forbidden=[...occupied.get(portKey(spec,"from")),...occupied.get(portKey(spec,"to"))];
      const choices=[];for(let value=Math.ceil(low);value<=Math.floor(high);value+=4)choices.push(value);
      choices.sort((a,b)=>Math.abs(a-desired)-Math.abs(b-desired)||a-b);
      spec.commonCoord=choices.find(value=>forbidden.every(other=>Math.abs(value-other)>=22))??Math.round(desired);
      occupied.get(portKey(spec,"from")).push(spec.commonCoord);
      occupied.get(portKey(spec,"to")).push(spec.commonCoord);
    }
    return specs;
  }
  function routeSegments(d){
    let x=0,y=0;const segments=[];
    for(const match of d.matchAll(/([MHV])(-?[\d.]+)(?:\s+(-?[\d.]+))?/g)){
      const nx=match[1]==="M"||match[1]==="H"?Number(match[2]):x;
      const ny=match[1]==="M"?Number(match[3]):match[1]==="V"?Number(match[2]):y;
      if(match[1]!=="M"&&Math.abs(nx-x)+Math.abs(ny-y)>1)
        segments.push({x1:x,y1:y,x2:nx,y2:ny,h:y===ny,length:Math.abs(nx-x)+Math.abs(ny-y)});
      x=nx;y=ny;
    }
    return segments;
  }
  function relationshipLabels(routes,boxes,width,height){
    const allSegments=routes.flatMap(item=>routeSegments(item.path.d));
    const glyphZones=routes.flatMap(({path})=>[path.p,path.q].map(p=>
      p.angle===0?{x:p.x,y:p.y-11,w:36,h:22}:
      p.angle===180?{x:p.x-36,y:p.y-11,w:36,h:22}:
      p.angle===90?{x:p.x-11,y:p.y,w:22,h:36}:{x:p.x-11,y:p.y-36,w:22,h:36}));
    const occupied=[];
    const overlaps=(a,b,pad=2)=>a.x<b.x+b.w+pad&&a.x+a.w+pad>b.x&&a.y<b.y+b.h+pad&&a.y+a.h+pad>b.y;
    const crosses=(r,s)=>s.h?s.y1>r.y-2&&s.y1<r.y+r.h+2&&Math.max(Math.min(s.x1,s.x2),r.x)<Math.min(Math.max(s.x1,s.x2),r.x+r.w):
      s.x1>r.x-2&&s.x1<r.x+r.w+2&&Math.max(Math.min(s.y1,s.y2),r.y)<Math.min(Math.max(s.y1,s.y2),r.y+r.h);
    return routes.map(item=>{
      const title=String(item.spec.edge[2]),w=Math.max(48,Math.ceil(title.length*7.1+16)),h=22;
      const segments=routeSegments(item.path.d).sort((a,b)=>Number(b.h)-Number(a.h)||b.length-a.length);
      const candidates=[];
      for(const s of segments){
        for(const t of [.5,.3,.7]){
          const cx=s.x1+(s.x2-s.x1)*t,cy=s.y1+(s.y2-s.y1)*t;
          if(s.h)for(const dy of [-38,16,-56,34])candidates.push({x:Math.round(cx-w/2),y:Math.round(cy+dy),w,h});
          else for(const dx of [12,-w-12,30,-w-30])candidates.push({x:Math.round(cx+dx),y:Math.round(cy-h/2),w,h});
        }
      }
      const clear=r=>r.x>=5&&r.y>=5&&r.x+r.w<=width-5&&r.y+r.h<=height-5&&
        boxes.every(box=>!overlaps(r,box,3))&&glyphZones.every(box=>!overlaps(r,box,1))&&
        occupied.every(box=>!overlaps(r,box,5))&&allSegments.every(s=>!crosses(r,s));
      let chosen=candidates.find(clear);
      if(!chosen){
        // Keep a label visible near its connector even in a dense case.
        const s=segments[0],cx=(s.x1+s.x2)/2,cy=(s.y1+s.y2)/2;
        for(let radius=45;radius<=140&&!chosen;radius+=15)
          for(const [dx,dy] of [[0,-radius],[0,radius],[-radius,0],[radius,0],[-radius,-radius],[radius,-radius]]){
            const r={x:Math.round(cx+dx-w/2),y:Math.round(cy+dy-h/2),w,h};if(clear(r)){chosen=r;break;}
          }
      }
      if(!chosen)return "";
      occupied.push(chosen);
      return `<g class="relationship-label" data-edge="${item.spec.index}"><rect class="rel-label-bg" x="${chosen.x}" y="${chosen.y}" width="${w}" height="${h}" rx="5"/><text class="rel-name" x="${chosen.x+w/2}" y="${chosen.y+15}">${esc(title)}</text></g>`;
    });
  }
  function model(c){
    if(models.has(c))return models.get(c);
    const positions=layout(c),boxes=c.nodes.map(n=>positions.get(n[0]));
    const maxX=Math.max(...boxes.map(p=>p.x+p.w))+55;
    const maxY=Math.max(...boxes.map(p=>p.y+p.h))+65;
    const width=Math.max(630,maxX),height=Math.max(300,maxY);
    const routes=edgeSpecs({edges:c.edges},positions).map(spec=>({spec,path:route(spec)}));
    const labels=relationshipLabels(routes,boxes,width,height);
    const result={positions,width,height,routes,labels};models.set(c,result);return result;
  }
  function diagram(c,stage){
    const graph=stageGraph(c,stage),fixed=model(c);
    const {positions,width,height,routes,labels}=fixed,visible=new Set(graph.edgeIds);
    let edges="",nodes="";
    for(const {spec,path} of routes)if(visible.has(spec.index))
      edges+=`<path class="erd-path" d="${path.d}" data-edge="${spec.index}"/>${graph.symbols?glyph(path.p,spec.edge[3])+glyph(path.q,spec.edge[4]):""}`;
    for(const node of graph.nodes){const p=positions.get(node[0]),fields=nodeFields(node);nodes+=`<g><rect class="entity-box" x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" data-entity="${esc(node[0])}" rx="4"/><path class="entity-head ${node[4]==="bridge"?"bridge":""}" d="M${p.x+4} ${p.y} H${p.x+p.w-4} Q${p.x+p.w} ${p.y} ${p.x+p.w} ${p.y+4} V${p.y+40} H${p.x} V${p.y+4} Q${p.x} ${p.y} ${p.x+4} ${p.y}"/><text class="entity-title" x="${p.x+p.w/2}" y="${p.y+26}">${esc(node[0])}</text>${graph.fields?fields.map((field,i)=>`<text class="entity-field ${field.key?"pk":""}" x="${p.x+14}" y="${p.y+66+i*24}">${esc(field.text)}</text>`).join(""):""}</g>`;}
    const names=routes.map((item,i)=>visible.has(item.spec.index)?labels[i]:"").join("");
    return `<svg role="img" aria-label="${esc(c.session)} ERD stage ${stage}: ${esc(stageNames[stage-1])}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="#fbfdff"/>${edges}${names}${nodes}</svg>`;
  }
  function endpointKey(c,stage){
    const graph=stageGraph(c,stage);
    return graph.symbols&&graph.edges.length?'<div class="endpoint-key" aria-label="Crow’s Foot endpoint legend"><span>|| exactly one</span><span>O| zero or one</span><span>O&lt; zero or many</span><span>|&lt; one or many</span></div>':"";
  }
  function list(items){return `<ul>${items.map(item=>`<li>${esc(item)}</li>`).join("")}</ul>`;}
  function emphasizeDecision(value){return esc(value).replace(/(?:M:N|1:M|0\.\.many|1\.\.many|exactly one|at least one|one or more|zero or many)/gi,match=>`<strong>${match}</strong>`);}
  function surgeryTable(rows){
    return `<div class="surgery-wrap"><table class="surgery"><thead><tr><th>Business-rule clue</th><th>Question to ask</th><th>ERD decision</th></tr></thead><tbody>${rows.map(([rule,clue,question,decision])=>`<tr><td><a class="rule-ref" href="#rule-${rule}">Rule ${rule}</a><br><mark class="evidence-mark">${esc(clue)}</mark></td><td>${esc(question)}</td><td>${emphasizeDecision(decision)}</td></tr>`).join("")}</tbody></table></div>`;
  }
  function bridgePanel(c,bridge){
    const node=c.nodes.find(item=>item[0]===bridge.name);
    const fields=nodeFields(node).map(field=>`<li>${esc(field.text)}</li>`).join("");
    return `<div class="bridge-panel"><div class="bridge-logic" aria-label="Two one-to-many relationships"><span>${esc(bridge.left)} <strong>1:M</strong> ${esc(bridge.name)}</span><span>${esc(bridge.right)} <strong>1:M</strong> ${esc(bridge.name)}</span></div><div class="bridge-detail"><article class="bridge-entity"><h3>${esc(bridge.name)}</h3><ul>${fields}</ul></article><div class="callout red bridge-why"><strong>Why this bridge?</strong><p>${esc(bridge.why)}</p></div></div></div>`;
  }
  function teachingStage(c,n){
    const lesson=window.ICT450_ERD_LESSONS?.[c.id]?.[n-3];
    if(!lesson)throw new Error(`Missing source-led explanation for ${c.id} Step ${n}`);
    return `<p>${esc(lesson.lead)}</p>${surgeryTable(lesson.rows)}${lesson.bridges.map(bridge=>bridgePanel(c,bridge)).join("")}${lesson.notes.map(note=>`<div class="callout teaching-note"><strong>Modelling note:</strong> ${esc(note)}</div>`).join("")}`;
  }
  function nounSurgery(c){
    const evidence=window.ICT450_ERD_FOUNDATIONS[c.id].entities;
    return `<p>A noun is only a candidate entity. Ask whether the system needs distinguishable occurrences with facts of their own.</p><div class="noun-grid">${evidence.map(([name,rule,clue,why])=>`<article class="noun-card"><a class="rule-ref" href="#rule-${rule}">Rule ${rule}</a><p class="noun-clue">“<mark class="evidence-mark">${esc(clue)}</mark>”</p><h3>${esc(name)}</h3><p>${esc(why)}</p></article>`).join("")}</div><div class="callout amber"><strong>Do not turn every noun into a table.</strong> Create an entity for a persistent record, not merely for a description, role, report, or number mentioned in the setting.</div>`;
  }
  function attributeCards(c){
    return `<p>Place each stated attribute with the entity it describes. The <strong>PK</strong> identifies one record; numbered <strong>FK</strong> fields result from the relationship analysis. An asterisk marks a proposed design detail rather than a fact supplied by the paper.</p><div class="attribute-grid">${c.nodes.filter(node=>!node[4]).map(node=>`<article class="attribute-card"><h3>${esc(node[0])}</h3><ul>${nodeFields(node).map(field=>`<li class="${field.key?"key-field":""}">${esc(field.text)}</li>`).join("")}</ul></article>`).join("")}</div><div class="callout teaching-note"><strong>Check the key evidence:</strong>${list(c.keys)}</div>`;
  }
  const endpointMeaning={"1":["exactly one","||"],"0one":["zero or one","O|"],"0many":["zero or many","O&lt;"],"many":["one or many","|&lt;"]};
  function endpointTranslation(c){
    const source=window.ICT450_ERD_FOUNDATIONS[c.id].edgeRules;
    return `<h3>Translate the wording into endpoints</h3><p>Read each connection <strong>from both directions</strong>. The symbol is placed beside the entity being counted. Follow the source-rule link to check which minimum is stated and which is a modelling assumption.</p><div class="surgery-wrap"><table class="surgery endpoint-table"><thead><tr><th>Source and relationship</th><th>For one left record, how many right records?</th><th>For one right record, how many left records?</th></tr></thead><tbody>${c.edges.map(([left,right,name,leftCard,rightCard],i)=>`<tr><td><a class="rule-ref" href="#rule-${source[i]}">Rule ${source[i]}</a><br><strong>${esc(left)} — ${esc(name)} — ${esc(right)}</strong></td><td><strong>${esc(right)}</strong>: ${endpointMeaning[rightCard][0]} <span class="endpoint-chip">${endpointMeaning[rightCard][1]}</span><br><small>Endpoint beside ${esc(right)}</small></td><td><strong>${esc(left)}</strong>: ${endpointMeaning[leftCard][0]} <span class="endpoint-chip">${endpointMeaning[leftCard][1]}</span><br><small>Endpoint beside ${esc(left)}</small></td></tr>`).join("")}</tbody></table></div><div class="callout teaching-note"><strong>Source-sensitive checks:</strong>${list(c.cardinality)}<p>A standard Crow’s Foot endpoint distinguishes zero, one and many; a requirement for <em>more than one</em> needs an additional constraint.</p></div>`;
  }
  function finalAnswer(c){
    const bridges=window.ICT450_ERD_LESSONS[c.id].flatMap(lesson=>lesson.bridges);
    return `<p>The complete model now combines the evidence, attribute ownership, relationships and endpoint choices. Compare every line below with the connected diagram.</p><div class="final-structure"><h3>Final relational structure</h3>${c.nodes.map(node=>`<p><strong>${esc(node[0])}</strong> (${nodeFields(node).map(field=>field.key?`<u>${esc(field.text)}</u>`:esc(field.text)).join(", ")})</p>`).join("")}<p class="structure-note">Underlined fields participate in the primary key. FK labels identify references; * denotes a proposed design detail, not supplied wording.</p></div><div class="check-grid"><div class="check"><strong>${c.nodes.length} entities</strong><br>Every required record has its own place.</div><div class="check"><strong>Identifiers shown</strong><br>Check every PK, composite key and numbered FK.</div><div class="check"><strong>${bridges.length} M:N resolution${bridges.length===1?"":"s"}</strong><br>Each M:N relationship has two 1:M links.</div><div class="check"><strong>Endpoints justified</strong><br>Read both directions; distinguish source facts from assumptions.</div></div><div class="callout teaching-note"><strong>Case-specific final checks:</strong>${list(c.checks)}</div>`;
  }
  function examinationAnswer(c){
    return `<section id="exam-answer"><h2>How to write the examination answer</h2><ol class="answer-steps"><li>Draw every entity in the final relational structure and include its required attributes.</li><li>Mark all primary and foreign keys clearly, including composite keys in associative entities.</li><li>Name every relationship and place the minimum/maximum Crow’s Foot symbols at <strong>both</strong> ends.</li><li>State any proposed key, inferred minimum or special constraint separately; do not present it as direct question wording.</li><li>Re-read the business rules and check that the diagram can represent each stated fact.</li></ol><div class="callout teaching-note"><strong>For Question 5(b):</strong> Give the requested number of distinct information outputs or reports, naming the records and attributes that make each possible. For this model, defensible examples include:${list(c.reports)}</div></section>`;
  }
  function step(c,n){
    const section=[
      {title:"Identify candidate entities",lead:"First isolate records that the system must keep. Some nouns are roles or attributes, not extra tables.",items:c.nodes.filter(x=>!x[4]).map(x=>x[0])},
      {title:"Assign identifiers and attributes",lead:"Underline the identifiers supplied by the paper. A trailing * marks a proposed identifier or implementation detail, not a stated fact.",items:c.keys},
      {title:window.ICT450_ERD_LESSONS[c.id][0].title},
      {title:window.ICT450_ERD_LESSONS[c.id][1].title},
      {title:window.ICT450_ERD_LESSONS[c.id][2].title},
      {title:"Inspect the complete examination ERD",lead:"Restore the attributes to the connected model. Primary keys are underlined; numbered FK labels identify foreign keys. Check every part against the paper.",items:c.checks.concat(["State assumptions openly; do not present proposed keys as facts from the question."])}
    ][n-1];
    const explanation=n===1?nounSurgery(c):n===2?attributeCards(c):n>=3&&n<=5?teachingStage(c,n)+(n===5?endpointTranslation(c):""):finalAnswer(c);
    return `<section class="step" id="step-${n}"><h2><span class="num">${n}</span>${section.title}</h2>${explanation}<figure class="focus"><figcaption class="focus-head">Diagram focus · Step ${n}: ${stageNames[n-1]}</figcaption>${endpointKey(c,n)}<div class="diagram-scroll">${diagram(c,n)}</div><p class="diagram-note">The full diagram fits the available view. Entity and relationship positions remain fixed as each stage adds detail.</p></figure></section>`;
  }
  function initQuickNav(){
    if(!window.matchMedia)return;
    const toggle=document.querySelector(".quick-nav-toggle");if(!toggle)return;
    toggle.hidden=false;
    const links=[...nav.querySelectorAll('a[href^="#"]')];
    const targets=links.map(link=>document.querySelector(link.getAttribute("href"))).filter(Boolean);
    const compact=window.matchMedia("(max-width:1240px)");
    const close=()=>{nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");};
    toggle.addEventListener("click",()=>{const open=!nav.classList.contains("is-open");nav.classList.toggle("is-open",open);toggle.setAttribute("aria-expanded",String(open));});
    links.forEach(link=>link.addEventListener("click",()=>{if(compact.matches)close();}));
    document.addEventListener("keydown",event=>{if(event.key==="Escape")close();});
    compact.addEventListener("change",close);
    let frame=0;
    const update=()=>{
      frame=0;const marker=window.scrollY+window.innerHeight*.28;let active=targets[0];
      targets.forEach(target=>{if(target.offsetTop<=marker)active=target;});
      if(!active)return;
      links.forEach(link=>{const current=link.getAttribute("href")===`#${active.id}`;link.classList.toggle("is-active",current);if(current)link.setAttribute("aria-current","location");else link.removeAttribute("aria-current");});
    };
    window.addEventListener("scroll",()=>{if(!frame)frame=requestAnimationFrame(update);},{passive:true});
    update();
  }
  function renderCase(c){
    document.title=`${c.session} Question 5 ERD · ICT450`;
    const images=c.pages.map((src,i)=>`<figure class="source-sheet"><a href="${src}" target="_blank"><img src="${src}" alt="${esc(c.session)} Question 5 page ${i+1}" loading="lazy"></a><figcaption>Question 5${c.pages.length>1?` · page ${i+1} of ${c.pages.length}`:""}. Select to enlarge.</figcaption></figure>`).join("");
    app.innerHTML=`<div class="hero" id="top"><p class="eyebrow">Past examination · ${esc(c.session)} · Question 5${instructorDraft?" · instructor reference":""}</p><h1>${esc(c.title)}</h1><p>Source question, colour-coded business-rule evidence, six focused model stages and a complete Crow's Foot diagram.</p></div>
      <div class="content"><p><a href="${homeHref}">← All worked ERD questions</a> · <a href="${c.paper}" target="_blank">Open the full examination paper</a></p>
      <div class="callout">Question 5(a) asks for a complete Crow's Foot ERD (16 marks). Question 5(b) asks for information or reports obtainable from the model (4 marks).</div>${c.reviewNotes?.length?`<div class="callout amber"><strong>Design choices used in this model</strong>${list(c.reviewNotes)}</div>`:""}
      <section id="question"><h2>Full business-rules question</h2><div class="source-grid">${images}</div><p>${esc(c.intro)}</p><div class="legend"><span class="e">Entity</span><span class="a">Attribute</span><span class="r">Relationship</span><span class="c">Cardinality</span><span class="b">Associative structure</span></div><ol class="rules">${c.rules.map((r,i)=>`<li id="rule-${i+1}">${marked(r)}</li>`).join("")}</ol>${c.preTasks?`<p>${esc(c.preTasks)}</p>`:""}<div class="tasks"><strong>Question tasks</strong><p>(a) ${esc(c.taskA||"Construct a complete Entity Relationship Diagram using Crow's Foot notation, with all required entities, attributes, relationships and cardinalities.")} <strong>(16 marks)</strong></p><p>(b) ${esc(c.taskB)}</p></div></section>
      ${Array.from({length:6},(_,i)=>step(c,i+1)).join("")}
      ${examinationAnswer(c)}
      <section id="recap"><h2>Interactive assembly recap</h2><p>Move from the first candidate entities to the final connected ERD. The written step diagrams above show the relevant layer at the end of each explanation.</p><div class="recap-controls" role="group" aria-label="Model assembly stage">${stageNames.map((name,i)=>`<button type="button" data-stage="${i+1}" aria-pressed="${i===0}">${i+1}. ${name}</button>`).join("")}</div><figure class="focus"><figcaption id="recapTitle" class="focus-head">Step 1 · Entities</figcaption><div id="recapKey">${endpointKey(c,1)}</div><div id="recapDiagram" class="diagram-scroll">${diagram(c,1)}</div><p class="diagram-note">A * marks a proposed key or implementation detail. Check the paper image before treating it as a supplied fact.</p></figure></section><p><a href="${homeHref}">← View the other worked questions</a></p></div>`;
    nav.innerHTML=`<strong>Jump to</strong><a href="#top" data-short="Top">Overview</a><a href="#question" data-short="Q">Question</a>${stageNames.map((name,i)=>`<a href="#step-${i+1}" data-short="${i+1}">${i+1} · ${name}</a>`).join("")}<a href="#exam-answer" data-short="Ans">Exam answer</a><a href="#recap" data-short="End">Recap</a>`;
    document.querySelectorAll("[data-stage]").forEach(button=>button.addEventListener("click",()=>{
      const stage=Number(button.dataset.stage);document.querySelectorAll("[data-stage]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
      document.getElementById("recapTitle").textContent=`Step ${stage} · ${stageNames[stage-1]}`;
      document.getElementById("recapDiagram").innerHTML=diagram(c,stage);
      document.getElementById("recapKey").innerHTML=endpointKey(c,stage);
    }));
    initQuickNav();
  }
  if(active)renderCase(active);else home();
})();
