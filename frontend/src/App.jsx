import { useState, useEffect, useCallback, useRef } from "react";

const STOCKS = [
  {symbol:"NABIL",name:"Nabil Bank Ltd",sector:"Banking",base:1150},
  {symbol:"NICA",name:"NIC Asia Bank",sector:"Banking",base:640},
  {symbol:"GBIME",name:"Global IME Bank",sector:"Banking",base:380},
  {symbol:"EBL",name:"Everest Bank Ltd",sector:"Banking",base:920},
  {symbol:"SCB",name:"Standard Chartered Bank",sector:"Banking",base:1680},
  {symbol:"ADBL",name:"Agricultural Dev. Bank",sector:"Banking",base:420},
  {symbol:"PRVU",name:"Prabhu Bank Ltd",sector:"Banking",base:290},
  {symbol:"SBI",name:"Nepal SBI Bank",sector:"Banking",base:390},
  {symbol:"SRBL",name:"Sunrise Bank Ltd",sector:"Banking",base:310},
  {symbol:"KBL",name:"Kumari Bank Ltd",sector:"Banking",base:270},
  {symbol:"NBB",name:"Nepal Bank Ltd",sector:"Banking",base:350},
  {symbol:"MEGA",name:"Mega Bank Nepal",sector:"Banking",base:260},
  {symbol:"CCBL",name:"Century Commercial Bank",sector:"Banking",base:280},
  {symbol:"SANIMA",name:"Sanima Bank Ltd",sector:"Banking",base:350},
  {symbol:"MBL",name:"Machhapuchchhre Bank",sector:"Banking",base:290},
  {symbol:"CZBIL",name:"Citizen Bank International",sector:"Banking",base:310},
  {symbol:"PCBL",name:"Prime Commercial Bank",sector:"Banking",base:310},
  {symbol:"LBBL",name:"Lumbini Bikas Bank",sector:"Banking",base:270},
  {symbol:"JBNL",name:"Janata Bank Nepal",sector:"Banking",base:250},
  {symbol:"MNBBL",name:"Muktinath Bikas Bank",sector:"Banking",base:280},
  {symbol:"GRDBL",name:"Garima Bikas Bank",sector:"Banking",base:230},
  {symbol:"MLBL",name:"Mahalaxmi Bikas Bank",sector:"Banking",base:210},
  {symbol:"CORBL",name:"Corporate Dev. Bank",sector:"Banking",base:200},
  {symbol:"KSBBL",name:"Kamana Sewa Bikas Bank",sector:"Banking",base:220},
  {symbol:"SINDU",name:"Sindhu Bikas Bank",sector:"Banking",base:200},
  {symbol:"NLIC",name:"Nepal Life Insurance",sector:"Insurance",base:2400},
  {symbol:"LICN",name:"Life Insurance Co. Nepal",sector:"Insurance",base:1900},
  {symbol:"NLICL",name:"Nepal Life Insurance Ltd",sector:"Insurance",base:1600},
  {symbol:"SICL",name:"Sagarmatha Insurance",sector:"Insurance",base:880},
  {symbol:"NICL",name:"National Insurance Co.",sector:"Insurance",base:1200},
  {symbol:"PICL",name:"Premier Insurance Co.",sector:"Insurance",base:750},
  {symbol:"HGI",name:"Himalayan General Insurance",sector:"Insurance",base:690},
  {symbol:"IGI",name:"IME General Insurance",sector:"Insurance",base:620},
  {symbol:"RBCL",name:"Rastriya Beema Co.",sector:"Insurance",base:1100},
  {symbol:"GLICL",name:"Gurans Life Insurance",sector:"Insurance",base:840},
  {symbol:"ALICL",name:"Asian Life Insurance",sector:"Insurance",base:760},
  {symbol:"JLIC",name:"Jyoti Life Insurance",sector:"Insurance",base:820},
  {symbol:"PLIC",name:"Prime Life Insurance",sector:"Insurance",base:910},
  {symbol:"SIC",name:"Shikhar Insurance Co.",sector:"Insurance",base:770},
  {symbol:"NIC",name:"Nepal Insurance Co.",sector:"Insurance",base:890},
  {symbol:"GIC",name:"General Insurance Co.",sector:"Insurance",base:1050},
  {symbol:"UPPER",name:"Upper Tamakoshi Hydro",sector:"Hydro",base:490},
  {symbol:"CHCL",name:"Chilime Hydropower",sector:"Hydro",base:720},
  {symbol:"SHPC",name:"Sanima Hydro Power",sector:"Hydro",base:340},
  {symbol:"RRHP",name:"Ridi Hydro Power",sector:"Hydro",base:280},
  {symbol:"AKPL",name:"Arun Kabeli Power",sector:"Hydro",base:190},
  {symbol:"BHPL",name:"Butwal Power Company",sector:"Hydro",base:380},
  {symbol:"API",name:"Ace Hydro Power",sector:"Hydro",base:150},
  {symbol:"MHNL",name:"Marsyangdi Hydro",sector:"Hydro",base:190},
  {symbol:"BARUN",name:"Barun Hydro Power",sector:"Hydro",base:320},
  {symbol:"UMHL",name:"Upper Marsyangdi Hydro",sector:"Hydro",base:220},
  {symbol:"RADHI",name:"Radhi Bidyut Co.",sector:"Hydro",base:210},
  {symbol:"HURJA",name:"Hurja Power Co.",sector:"Hydro",base:195},
  {symbol:"NGPL",name:"Nepal Ganga Power",sector:"Hydro",base:430},
  {symbol:"DHPL",name:"Dordi Khola Hydro",sector:"Hydro",base:175},
  {symbol:"KKHC",name:"Khani Khola Hydro",sector:"Hydro",base:165},
  {symbol:"PMHPL",name:"Panchakanya Mai Hydro",sector:"Hydro",base:200},
  {symbol:"SSHL",name:"Sahas Urja Ltd",sector:"Hydro",base:155},
  {symbol:"SPHL",name:"Solu Power Hydro Ltd",sector:"Hydro",base:165},
  {symbol:"SJCL",name:"Sunkoshi Jalvidhyut",sector:"Hydro",base:190},
  {symbol:"NIFRA",name:"Nepal Infrastructure Bank",sector:"Finance",base:115},
  {symbol:"ICFC",name:"ICFC Finance",sector:"Finance",base:430},
  {symbol:"CFCL",name:"Central Finance",sector:"Finance",base:510},
  {symbol:"SIFC",name:"Siddhartha Finance",sector:"Finance",base:380},
  {symbol:"GMFIL",name:"Goodwill Finance",sector:"Finance",base:290},
  {symbol:"MFIL",name:"Manjushree Finance",sector:"Finance",base:340},
  {symbol:"FMDBL",name:"Forward Microfinance",sector:"Finance",base:1200},
  {symbol:"SWBBL",name:"Swabhiman Laghubitta",sector:"Finance",base:1800},
  {symbol:"SMFDB",name:"Swabalamban Laghubitta",sector:"Finance",base:2100},
  {symbol:"NMBMF",name:"NMB Microfinance",sector:"Finance",base:1650},
  {symbol:"CBBL",name:"Chhimek Laghubitta",sector:"Finance",base:1720},
  {symbol:"SKBBL",name:"Sana Kisan Bikas Bank",sector:"Finance",base:980},
  {symbol:"VLBS",name:"Vijaya Laghubitta",sector:"Finance",base:1150},
  {symbol:"MSMBS",name:"Mero Microfinance",sector:"Finance",base:1380},
  {symbol:"UNLB",name:"United Laghubitta",sector:"Finance",base:1450},
  {symbol:"NTC",name:"Nepal Telecom",sector:"Telecom",base:750},
  {symbol:"SHIVM",name:"Shivam Cements",sector:"Mfg.",base:260},
  {symbol:"HDL",name:"Himalayan Distillery",sector:"Mfg.",base:1850},
  {symbol:"UNFL",name:"Unilever Nepal",sector:"Mfg.",base:2800},
  {symbol:"BNT",name:"Bottlers Nepal Terai",sector:"Mfg.",base:4200},
  {symbol:"BNL",name:"Bottlers Nepal Ltd",sector:"Mfg.",base:3800},
  {symbol:"NRSNL",name:"Nepal Rosin & Turpentine",sector:"Mfg.",base:740},
  {symbol:"OHL",name:"Oberoi Hotels Ltd",sector:"Hotels",base:1650},
  {symbol:"SHL",name:"Soaltee Hotel Ltd",sector:"Hotels",base:720},
  {symbol:"TRH",name:"Taragaon Regency Hotel",sector:"Hotels",base:480},
  {symbol:"BBC",name:"Bishal Bazar Co.",sector:"Trading",base:1900},
  {symbol:"STC",name:"Salt Trading Corp.",sector:"Trading",base:560},
  {symbol:"CIT",name:"Citizen Investment Trust",sector:"Investment",base:1850},
  {symbol:"HIDCL",name:"Hydro Investment Dev. Co.",sector:"Investment",base:380},
  {symbol:"NIDC",name:"Nepal Industrial Dev. Corp.",sector:"Investment",base:1200},
];

function mkRng(seed){let s=seed>>>0;return()=>{s=Math.imul(1664525,s)+1013904223>>>0;return s/0xFFFFFFFF};}

function genOHLCV(symbol,base){
  const rng=mkRng(symbol.split("").reduce((a,c)=>a+c.charCodeAt(0),0)+42);
  let price=base;const rows=[];const now=Date.now();
  for(let i=89;i>=0;i--){
    const drift=(rng()-0.47)*0.028;
    price=Math.max(base*0.3,price*(1+drift));
    const o=price*(0.992+rng()*0.016);
    const h=Math.max(o,price)*(1+rng()*0.022);
    const l=Math.min(o,price)*(1-rng()*0.022);
    const v=Math.floor(8000+rng()*120000);
    rows.push({date:new Date(now-i*86400000).toLocaleDateString("ne-NP",{month:"short",day:"numeric"}),
      o:+o.toFixed(2),h:+h.toFixed(2),l:+l.toFixed(2),c:+price.toFixed(2),v});
  }
  return rows;
}

function ema(arr,n){const k=2/(n+1);let e=arr[0];return arr.map(v=>(e=v*k+e*(1-k)));}
function sma(arr,n){return arr.map((_,i)=>i<n-1?null:arr.slice(i-n+1,i+1).reduce((a,b)=>a+b,0)/n);}
function calcRSI(closes,n=14){
  const d=closes.map((v,i)=>i===0?0:v-closes[i-1]);
  let ag=0,al=0;
  for(let i=1;i<=n;i++){ag+=Math.max(0,d[i])/n;al+=Math.max(0,-d[i])/n;}
  const rsis=[null,...Array(n-1).fill(null)];
  for(let i=n;i<closes.length;i++){
    const g=Math.max(0,d[i]),l=Math.max(0,-d[i]);
    ag=(ag*(n-1)+g)/n;al=(al*(n-1)+l)/n;
    rsis.push(al===0?100:+(100-100/(1+ag/al)).toFixed(2));
  }
  return rsis;
}

function calcSignal(ohlcv){
  const closes=ohlcv.map(r=>r.c);
  const vols=ohlcv.map(r=>r.v);
  const rsiArr=calcRSI(closes);
  const rsi=rsiArr[rsiArr.length-1]??50;
  const ma20s=sma(closes,20);const ma50s=sma(closes,50);
  const ma20=ma20s[ma20s.length-1];const ma50=ma50s[ma50s.length-1];
  const ema12=ema(closes,12);const ema26=ema(closes,26);
  const macd=ema12[ema12.length-1]-ema26[ema26.length-1];
  const sigLine=ema(ema12.map((v,i)=>v-ema26[i]),9);
  const macdHist=macd-sigLine[sigLine.length-1];
  const vAvg5=vols.slice(-5).reduce((a,b)=>a+b,0)/5;
  const vAvg20=vols.slice(-20).reduce((a,b)=>a+b,0)/20;
  const volTrend=vAvg5>vAvg20*1.2?"increasing":vAvg5<vAvg20*0.8?"decreasing":"stable";
  const curPrice=closes[closes.length-1];
  const prevClose=closes[closes.length-2];
  const changePct=+((curPrice-prevClose)/prevClose*100).toFixed(2);
  const bb20=ma20;const std=Math.sqrt(closes.slice(-20).reduce((a,v)=>a+(v-bb20)**2,0)/20);
  const bbU=bb20+2*std,bbL=bb20-2*std;
  const pctB=(curPrice-bbL)/(bbU-bbL||1);
  const support=Math.min(...ohlcv.slice(-20).map(r=>r.l));
  const resist=Math.max(...ohlcv.slice(-20).map(r=>r.h));
  let score=0,reasons=[],warns=[];
  if(rsi<25){score+=3;reasons.push(`RSI ${rsi.toFixed(1)} — अत्यधिक ओभरसोल्ड (खरिद क्षेत्र)`);}
  else if(rsi<35){score+=2;reasons.push(`RSI ${rsi.toFixed(1)} — ओभरसोल्ड (खरिद क्षेत्र)`);}
  else if(rsi<45){score+=0.5;reasons.push(`RSI ${rsi.toFixed(1)} — खरिद क्षेत्रतर्फ`);}
  else if(rsi>75){score-=3;reasons.push(`RSI ${rsi.toFixed(1)} — अत्यधिक ओभरबट`);warns.push("RSI अत्यधिक उच्च — उल्टो हुने सम्भावना");}
  else if(rsi>65){score-=2;reasons.push(`RSI ${rsi.toFixed(1)} — ओभरबट (बिक्री क्षेत्र)`);}
  if(macdHist>0&&macd>0){score+=2;reasons.push("MACD बुलिस क्रसओभर — सकारात्मक momentum");}
  else if(macdHist<0&&macd<0){score-=2;reasons.push("MACD बेयरिस — नकारात्मक momentum");}
  else if(macd>0){score+=0.5;reasons.push("MACD शून्यभन्दा माथि");}
  if(curPrice>ma20&&ma20>ma50){score+=1.5;reasons.push("मूल्य MA20 र MA50 भन्दा माथि — अपट्रेन्ड");}
  else if(curPrice<ma20&&ma20<ma50){score-=1.5;reasons.push("मूल्य MA20 र MA50 भन्दा तल — डाउनट्रेन्ड");}
  if(pctB<0.1){score+=1.5;reasons.push("मूल्य बोलिन्जर लोअर ब्यान्ड नजिक — सम्भावित उछाल");}
  else if(pctB>0.9){score-=1.5;reasons.push("मूल्य बोलिन्जर अपर ब्यान्डमा");warns.push("अपर ब्यान्डमा ओभरबट दबाव");}
  if(volTrend==="increasing"){score+=0.5*(score>0?1:-1);reasons.push("भोल्युम बढ्दो — ट्रेन्ड पुष्टि");}
  if(Math.abs(curPrice-support)/curPrice<0.03){score+=0.8;reasons.push("सपोर्ट लेभल नजिक — सम्भावित उछाल");}
  if(Math.abs(resist-curPrice)/curPrice<0.03){score-=0.8;reasons.push("रेजिस्टेन्स लेभल नजिक — सावधानी");}
  let signal,color,bg,conf;
  if(score>=5){signal="STRONG BUY";color="#00ff9d";bg="#00ff9d18";conf=Math.min(96,68+score*3);}
  else if(score>=2.5){signal="BUY";color="#4ade80";bg="#4ade8018";conf=Math.min(85,55+score*4);}
  else if(score>=-2.5){signal="HOLD";color="#fbbf24";bg="#fbbf2418";conf=Math.min(70,40+Math.abs(score)*5);}
  else if(score>=-5){signal="SELL";color="#f87171";bg="#f8717118";conf=Math.min(85,55+Math.abs(score)*4);}
  else{signal="STRONG SELL";color="#ff4d6d";bg="#ff4d6d18";conf=Math.min(96,68+Math.abs(score)*3);}
  return{rsi:+rsi.toFixed(1),ma20:+ma20?.toFixed(2),ma50:+ma50?.toFixed(2),
    macd:+macd.toFixed(2),macdHist:+macdHist.toFixed(2),volTrend,
    vAvg5:Math.round(vAvg5),vAvg20:Math.round(vAvg20),
    bbU:+bbU.toFixed(2),bbL:+bbL.toFixed(2),bb20:+bb20.toFixed(2),pctB:+pctB.toFixed(3),
    support:+support.toFixed(2),resist:+resist.toFixed(2),
    curPrice,prevClose,changePct,signal,color,bg,conf:Math.round(conf),score:+score.toFixed(2),
    reasons,warns};
}

function loadAllStocks(){
  return STOCKS.map(s=>{
    const ohlcv=genOHLCV(s.symbol,s.base);
    const ind=calcSignal(ohlcv);
    return{...s,ohlcv,ind};
  });
}

// ── AI analysis via OpenRouter ──────────────────────────────────────────────
async function fetchAI(stock){
  const{ind,name,sector,symbol}=stock;
  const prompt=`तपाईं एक NEPSE stock विश्लेषक हुनुहुन्छ। यो stock को विश्लेषण गर्नुस्।
Stock: ${symbol} (${name}, ${sector})
मूल्य: Rs.${ind.curPrice.toFixed(2)} | परिवर्तन: ${ind.changePct}%
RSI: ${ind.rsi} | Signal: ${ind.signal} (${ind.conf}%)
MA20: Rs.${ind.ma20} | MA50: Rs.${ind.ma50}
MACD: ${ind.macd} | Volume: ${ind.volTrend}
Support: Rs.${ind.support} | Resistance: Rs.${ind.resist}

नेपालीमा ३ छोटा paragraph लेख्नुस्:
१) अहिलेको अवस्था के छ?
२) मुख्य अवसर वा जोखिम के छ?
३) नेपाली लगानीकर्ताको लागि छोटो सुझाव।
८० शब्दभन्दा कम राख्नुस्। सरल नेपाली भाषामा लेख्नुस्।`;
  try{
    const key=const key=import.meta.env.VITE_OPENROUTER_KEY;
    const r=await fetch("https://openrouter.ai/api/v1/chat/completions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${key}`,
        "HTTP-Referer":"http://localhost:5173",
        "X-Title":"NEPSE AI"
      },
      body:JSON.stringify({
        model:"qwen/qwen3-235b-a22b",
        messages:[{role:"user",content:prompt}]
      })
    });
    const d=await r.json();
    if(d.error)return`Error: ${d.error.message}`;
    return d.choices?.[0]?.message?.content||"विश्लेषण उपलब्ध छैन।";
  }catch(e){
    return"विश्लेषण उपलब्ध छैन: "+e.message;
  }
}

function Spark({data,color,w=100,h=36}){
  const vals=data.slice(-30).map(r=>r.c);
  if(vals.length<2)return null;
  const mn=Math.min(...vals),mx=Math.max(...vals),rng=mx-mn||1;
  const pts=vals.map((v,i)=>`${(i/(vals.length-1))*w},${h-((v-mn)/rng)*(h-4)-2}`).join(" ");
  const fill=`0,${h} ${pts} ${w},${h}`;
  return(
    <svg width={w} height={h} style={{display:"block",overflow:"visible"}}>
      <defs>
        <linearGradient id={`sg${color.replace(/[^a-z0-9]/gi,"")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={fill} fill={`url(#sg${color.replace(/[^a-z0-9]/gi,"")})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function CandleChart({ohlcv,w=600,h=220}){
  const data=ohlcv.slice(-30);
  const vals=data.flatMap(c=>[c.h,c.l]);
  const mn=Math.min(...vals),mx=Math.max(...vals),rng=mx-mn||1;
  const pad={t:10,b:24,l:8,r:8};
  const iw=w-pad.l-pad.r,ih=h-pad.t-pad.b;
  const cw=Math.floor(iw/data.length)-2;
  const toY=v=>pad.t+ih-((v-mn)/rng)*ih;
  return(
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{display:"block"}}>
      {[0,1,2,3,4].map(i=>{
        const p=mn+i*(rng/4);
        return <line key={i} x1={pad.l} y1={toY(p)} x2={w-pad.r} y2={toY(p)} stroke="#ffffff08" strokeWidth="1"/>;
      })}
      {data.map((c,i)=>{
        const x=pad.l+(i/data.length)*iw+1;
        const up=c.c>=c.o;
        const col=up?"#00ff9d":"#ff4d6d";
        const by=toY(Math.max(c.o,c.c));
        const bh=Math.max(1,toY(Math.min(c.o,c.c))-by);
        return(
          <g key={i}>
            <line x1={x+cw/2} y1={toY(c.h)} x2={x+cw/2} y2={toY(c.l)} stroke={col} strokeWidth="1"/>
            <rect x={x} y={by} width={cw} height={bh} fill={up?col:"none"} stroke={col} strokeWidth="1" rx="0.5"/>
          </g>
        );
      })}
    </svg>
  );
}

function VolChart({ohlcv,w=600,h=60}){
  const data=ohlcv.slice(-30);
  const mx=Math.max(...data.map(r=>r.v));
  const iw=w-8,ih=h-8;
  const bw=Math.floor(iw/data.length)-1;
  return(
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{display:"block"}}>
      {data.map((c,i)=>{
        const bh=(c.v/mx)*ih;
        const up=c.c>=c.o;
        return <rect key={i} x={4+(i/data.length)*iw} y={ih-bh+4} width={bw} height={bh} fill={up?"#00ff9d44":"#ff4d6d44"} rx="1"/>;
      })}
    </svg>
  );
}

function RSIGauge({val}){
  const col=val<30?"#00ff9d":val>70?"#ff4d6d":"#fbbf24";
  const ang=(val/100)*180-90;
  const toR=d=>d*Math.PI/180;
  const r=38,cx=50,cy=50;
  const nx=cx+r*Math.cos(toR(ang-90));
  const ny=cy+r*Math.sin(toR(ang-90));
  return(
    <svg viewBox="0 0 100 60" width="100" height="60">
      <path d="M12,50 A38,38 0 0,1 88,50" fill="none" stroke="#1e293b" strokeWidth="9" strokeLinecap="round"/>
      <path d="M12,50 A38,38 0 0,1 50,12" fill="none" stroke="#4ade8022" strokeWidth="9" strokeLinecap="round"/>
      <path d="M50,12 A38,38 0 0,1 88,50" fill="none" stroke="#ff4d6d22" strokeWidth="9" strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={col} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="3.5" fill={col}/>
      <text x="50" y="64" textAnchor="middle" fill={col} fontSize="10" fontWeight="bold" fontFamily="monospace">{val}</text>
    </svg>
  );
}

function Badge({signal,color,bg,small}){
  return(
    <span style={{display:"inline-block",padding:small?"2px 7px":"3px 10px",borderRadius:999,
      background:bg,color,fontSize:small?9:10,fontWeight:700,fontFamily:"monospace",
      letterSpacing:0.5,border:`1px solid ${color}55`}}>{signal}</span>
  );
}

export default function NEPSEApp(){
  const [allStocks,setAllStocks]=useState([]);
  const [selected,setSelected]=useState(null);
  const [tab,setTab]=useState("market");
  const [sector,setSector]=useState("All");
  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("signal");
  const [aiText,setAiText]=useState("");
  const [aiLoading,setAiLoading]=useState(false);
  const [watchlist,setWatchlist]=useState(["NABIL","NTC","UPPER"]);
  const [lastUpdate,setLastUpdate]=useState(new Date());
  const [marketSum,setMarketSum]=useState(null);
  const scrollRef=useRef(null);

  useEffect(()=>{
    const data=loadAllStocks();
    setAllStocks(data);
    const buy=data.filter(s=>s.ind.signal.includes("BUY")).length;
    const sell=data.filter(s=>s.ind.signal.includes("SELL")).length;
    const hold=data.filter(s=>s.ind.signal==="HOLD").length;
    const avgRsi=+(data.reduce((a,s)=>a+s.ind.rsi,0)/data.length).toFixed(1);
    const sentiment=buy>sell*1.4?"BULLISH":sell>buy*1.4?"BEARISH":"NEUTRAL";
    setMarketSum({buy,sell,hold,avgRsi,sentiment,total:data.length});
  },[]);

  const sectors=["All",...new Set(STOCKS.map(s=>s.sector))];

  const displayStocks=()=>{
    let arr=tab==="watchlist"?allStocks.filter(s=>watchlist.includes(s.symbol)):allStocks;
    if(sector!=="All")arr=arr.filter(s=>s.sector===sector);
    if(search)arr=arr.filter(s=>s.symbol.includes(search.toUpperCase())||s.name.toLowerCase().includes(search.toLowerCase()));
    return[...arr].sort((a,b)=>{
      if(sort==="signal"){const o={"STRONG BUY":0,"BUY":1,"HOLD":2,"SELL":3,"STRONG SELL":4};return(o[a.ind.signal]??2)-(o[b.ind.signal]??2);}
      if(sort==="change")return b.ind.changePct-a.ind.changePct;
      if(sort==="rsi")return a.ind.rsi-b.ind.rsi;
      if(sort==="price")return b.ind.curPrice-a.ind.curPrice;
      return 0;
    });
  };

  const openStock=async(stock)=>{
    setSelected(stock);setAiText("");setAiLoading(true);
    if(scrollRef.current)scrollRef.current.scrollTo({top:0,behavior:"smooth"});
    try{const t=await fetchAI(stock);setAiText(t);}
    catch{setAiText("विश्लेषण उपलब्ध छैन।");}
    finally{setAiLoading(false);}
  };

  const toggleWL=(sym)=>{
    setWatchlist(w=>w.includes(sym)?w.filter(s=>s!==sym):[...w,sym]);
  };

  const refresh=()=>{
    const data=loadAllStocks();setAllStocks(data);setLastUpdate(new Date());
    if(selected){const upd=data.find(s=>s.symbol===selected.symbol);if(upd)setSelected(upd);}
  };

  const sentCol=marketSum?.sentiment==="BULLISH"?"#00ff9d":marketSum?.sentiment==="BEARISH"?"#ff4d6d":"#fbbf24";
  const topBuys=allStocks.filter(s=>s.ind.signal.includes("BUY")).sort((a,b)=>b.ind.conf-a.ind.conf).slice(0,5);
  const topSells=allStocks.filter(s=>s.ind.signal.includes("SELL")).sort((a,b)=>b.ind.conf-a.ind.conf).slice(0,5);
  const sc=selected?.ind?.color||"#00ff9d";

  return(
    <div ref={scrollRef} style={{minHeight:"100vh",background:"#060d1a",fontFamily:"'DM Mono',monospace",color:"#e2e8f0",overflowX:"hidden"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        background:"radial-gradient(ellipse 70% 35% at 15% 5%,#0d3b2e1a 0%,transparent 60%)"}}/>

      {/* TOPBAR */}
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,13,26,0.95)",
        backdropFilter:"blur(20px)",borderBottom:"1px solid #ffffff0d",padding:"0 20px",
        display:"flex",alignItems:"center",justifyContent:"space-between",height:54}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#00ff9d,#00b4d8)",
            display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:15,color:"#060d1a"}}>N</div>
          <span style={{fontWeight:700,fontSize:15,letterSpacing:1.5,color:"#00ff9d"}}>NEPSE·AI</span>
          <span style={{fontSize:9,color:"#475569",border:"1px solid #1e293b",padding:"1px 5px",borderRadius:3}}>नेपाली</span>
        </div>
        <div style={{display:"flex",gap:2}}>
          {["market","signals","top","watchlist"].map(t=>(
            <button key={t} onClick={()=>{setSelected(null);setTab(t);}} style={{
              padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",
              fontSize:10,letterSpacing:0.8,fontFamily:"inherit",
              background:tab===t?"#00ff9d12":"transparent",
              color:tab===t?"#00ff9d":"#475569",
              borderBottom:tab===t?"1.5px solid #00ff9d":"1.5px solid transparent"}}>
              {t==="market"?"बजार":t==="signals"?"संकेत":t==="top"?"शीर्ष":"वाचलिस्ट"}
            </button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:9,color:"#334155"}}>{lastUpdate.toLocaleTimeString()}</span>
          <button onClick={refresh} style={{background:"transparent",border:"1px solid #1e293b",
            color:"#00ff9d",padding:"4px 10px",borderRadius:5,cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>
            ⟳ रिफ्रेस
          </button>
        </div>
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",padding:"16px 16px"}}>

        {/* DETAIL VIEW */}
        {selected&&(
          <div>
            <button onClick={()=>setSelected(null)} style={{background:"transparent",border:"1px solid #1e293b",
              color:"#64748b",padding:"5px 14px",borderRadius:6,cursor:"pointer",fontSize:10,fontFamily:"inherit",marginBottom:16}}>
              ← फिर्ता
            </button>
            <div style={{background:"#0d1929",border:`1px solid ${sc}22`,borderRadius:14,padding:"20px 24px",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
                    <span style={{fontSize:24,fontWeight:800,color:"#e2e8f0"}}>{selected.symbol}</span>
                    <Badge signal={selected.ind.signal} color={selected.ind.color} bg={selected.ind.bg}/>
                    <button onClick={()=>toggleWL(selected.symbol)} style={{background:"none",border:"none",
                      cursor:"pointer",fontSize:20,color:watchlist.includes(selected.symbol)?"#fbbf24":"#334155"}}>
                      {watchlist.includes(selected.symbol)?"★":"☆"}
                    </button>
                  </div>
                  <div style={{fontSize:12,color:"#64748b"}}>{selected.name} · {selected.sector}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:32,fontWeight:800,fontFamily:"monospace"}}>रु.{selected.ind.curPrice.toFixed(2)}</div>
                  <div style={{color:selected.ind.changePct>=0?"#00ff9d":"#ff4d6d",fontWeight:700,fontSize:13}}>
                    {selected.ind.changePct>=0?"▲":"▼"} {Math.abs(selected.ind.changePct)}%
                  </div>
                  <div style={{fontSize:10,color:"#475569",marginTop:4}}>विश्वास: {selected.ind.conf}%</div>
                  <div style={{height:3,background:"#1e293b",borderRadius:2,width:120,marginTop:4,marginLeft:"auto"}}>
                    <div style={{height:3,borderRadius:2,width:`${selected.ind.conf}%`,
                      background:`linear-gradient(90deg,${sc}88,${sc})`}}/>
                  </div>
                </div>
              </div>
            </div>

            <div style={{background:"#0d1929",border:"1px solid #ffffff0a",borderRadius:14,padding:"16px 20px",marginBottom:12}}>
              <div style={{fontSize:10,color:"#475569",letterSpacing:1,marginBottom:10}}>३०-दिन क्यान्डलस्टिक चार्ट</div>
              <CandleChart ohlcv={selected.ohlcv} w={780} h={220}/>
              <div style={{marginTop:6}}>
                <div style={{fontSize:10,color:"#475569",marginBottom:4}}>भोल्युम</div>
                <VolChart ohlcv={selected.ohlcv} w={780} h={55}/>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10,marginBottom:12}}>
              <div style={{background:"#0d1929",border:"1px solid #ffffff0a",borderRadius:12,padding:14}}>
                <div style={{fontSize:10,color:"#475569",marginBottom:8}}>RSI (14)</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <RSIGauge val={selected.ind.rsi}/>
                  <div>
                    <div style={{fontSize:11,color:selected.ind.rsi<30?"#00ff9d":selected.ind.rsi>70?"#ff4d6d":"#fbbf24"}}>
                      {selected.ind.rsi<30?"🟢 ओभरसोल्ड":selected.ind.rsi>70?"🔴 ओभरबट":"🟡 न्यूट्रल"}
                    </div>
                    <div style={{fontSize:9,color:"#334155",marginTop:4}}>३०=किन्नुस् · ७०=बेच्नुस्</div>
                  </div>
                </div>
              </div>
              <div style={{background:"#0d1929",border:"1px solid #ffffff0a",borderRadius:12,padding:14}}>
                <div style={{fontSize:10,color:"#475569",marginBottom:8}}>MACD</div>
                <div style={{fontSize:22,fontWeight:800,color:selected.ind.macd>0?"#00ff9d":"#ff4d6d",fontFamily:"monospace"}}>
                  {selected.ind.macd>0?"+":""}{selected.ind.macd}
                </div>
                <div style={{fontSize:9,color:"#64748b",marginTop:2}}>
                  {selected.ind.macd>0&&selected.ind.macdHist>0?"📈 बुलिस क्रसओभर":"📉 बेयरिस momentum"}
                </div>
              </div>
              <div style={{background:"#0d1929",border:"1px solid #ffffff0a",borderRadius:12,padding:14}}>
                <div style={{fontSize:10,color:"#475569",marginBottom:8}}>चलायमान औसत</div>
                {[{l:"MA20",v:selected.ind.ma20},{l:"MA50",v:selected.ind.ma50}].map(m=>{
                  const above=selected.ind.curPrice>m.v;
                  return(
                    <div key={m.l} style={{marginBottom:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:3}}>
                        <span style={{color:"#64748b"}}>{m.l}</span>
                        <span style={{color:above?"#00ff9d":"#ff4d6d"}}>रु.{m.v} {above?"↑":"↓"}</span>
                      </div>
                      <div style={{height:3,background:"#1e293b",borderRadius:2}}>
                        <div style={{height:3,borderRadius:2,width:`${Math.min(100,(m.v/selected.ind.curPrice)*50+25)}%`,
                          background:above?"#00ff9d":"#ff4d6d"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{background:"#0d1929",border:"1px solid #ffffff0a",borderRadius:12,padding:14}}>
                <div style={{fontSize:10,color:"#475569",marginBottom:8}}>भोल्युम</div>
                <div style={{fontSize:18,fontWeight:800,
                  color:selected.ind.volTrend==="increasing"?"#00ff9d":selected.ind.volTrend==="decreasing"?"#ff4d6d":"#fbbf24"}}>
                  {selected.ind.volTrend==="increasing"?"बढ्दो":selected.ind.volTrend==="decreasing"?"घट्दो":"स्थिर"}
                </div>
              </div>
              <div style={{background:"#0d1929",border:"1px solid #ffffff0a",borderRadius:12,padding:14}}>
                <div style={{fontSize:10,color:"#475569",marginBottom:8}}>सपोर्ट र रेजिस्टेन्स</div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontSize:9,color:"#475569"}}>सपोर्ट</div>
                    <div style={{fontSize:16,fontWeight:800,color:"#00ff9d",fontFamily:"monospace"}}>रु.{selected.ind.support}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:9,color:"#475569"}}>रेजिस्टेन्स</div>
                    <div style={{fontSize:16,fontWeight:800,color:"#ff4d6d",fontFamily:"monospace"}}>रु.{selected.ind.resist}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{background:"#0d1929",border:`1px solid ${sc}22`,borderRadius:12,padding:"14px 18px",marginBottom:12}}>
              <div style={{fontSize:10,color:"#475569",marginBottom:10}}>संकेत विश्लेषण</div>
              {selected.ind.reasons.map((r,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:6}}>
                  <span style={{color:sc,fontSize:7,marginTop:5}}>◆</span>
                  <span style={{fontSize:11,color:"#94a3b8",lineHeight:1.6}}>{r}</span>
                </div>
              ))}
              {selected.ind.warns.map((w,i)=>(
                <div key={`w${i}`} style={{display:"flex",gap:8,marginBottom:6}}>
                  <span style={{fontSize:11}}>⚠️</span>
                  <span style={{fontSize:11,color:"#fbbf24",lineHeight:1.6}}>{w}</span>
                </div>
              ))}
            </div>

            <div style={{background:"#0d1929",border:"1px solid #00b4d833",borderRadius:12,padding:"16px 20px",marginBottom:20}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <span style={{fontSize:16}}>🤖</span>
                <span style={{fontSize:10,color:"#00b4d8",letterSpacing:1}}>AI विश्लेषक — नेपाली सुझाव</span>
              </div>
              {aiLoading?(
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"#00b4d8",animation:"pulse 1s infinite"}}/>
                  <span style={{color:"#475569",fontSize:11}}>{selected.symbol} विश्लेषण गर्दैछ...</span>
                </div>
              ):(
                <div style={{fontSize:12,color:"#94a3b8",lineHeight:1.85,whiteSpace:"pre-wrap"}}>{aiText}</div>
              )}
            </div>

            <div style={{background:"#0f0909",border:"1px solid #ff4d6d22",borderRadius:10,padding:"10px 16px",marginBottom:32,fontSize:10,color:"#475569"}}>
              ⚠️ <strong style={{color:"#fbbf24"}}>अस्वीकरण:</strong> यो वित्तीय सल्लाह होइन। प्राविधिक विश्लेषणमा आधारित छ। आफ्नै जोखिममा लगानी गर्नुस्।
            </div>
          </div>
        )}

        {/* MARKET / WATCHLIST */}
        {!selected&&(tab==="market"||tab==="watchlist")&&(
          <>
            {marketSum&&tab==="market"&&(
              <div style={{background:"#0d1929",border:`1px solid ${sentCol}22`,borderRadius:14,padding:"16px 20px",marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                  <div>
                    <div style={{fontSize:10,color:"#475569",marginBottom:4}}>बजार भावना</div>
                    <div style={{fontSize:22,fontWeight:800,color:sentCol}}>
                      {marketSum.sentiment==="BULLISH"?"तेजी":marketSum.sentiment==="BEARISH"?"मन्दी":"तटस्थ"}
                    </div>
                    <div style={{fontSize:10,color:"#475569",marginTop:2}}>औसत RSI: {marketSum.avgRsi} · {marketSum.total} स्टक</div>
                  </div>
                  <div style={{display:"flex",gap:24}}>
                    {[{l:"किन्नुस्",v:marketSum.buy,c:"#00ff9d"},{l:"होल्ड",v:marketSum.hold,c:"#fbbf24"},{l:"बेच्नुस्",v:marketSum.sell,c:"#ff4d6d"}].map(x=>(
                      <div key={x.l} style={{textAlign:"center"}}>
                        <div style={{fontSize:28,fontWeight:800,color:x.c,fontFamily:"monospace"}}>{x.v}</div>
                        <div style={{fontSize:9,color:"#475569"}}>{x.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div style={{background:"#0f0909",border:"1px solid #ff4d6d22",borderRadius:8,padding:"8px 14px",marginBottom:12,fontSize:10,color:"#475569"}}>
              ⚠️ <strong style={{color:"#fbbf24"}}>अस्वीकरण:</strong> सबै संकेत शैक्षिक उद्देश्यका लागि मात्र हुन्। वित्तीय सल्लाह होइन।
            </div>

            <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:10}}>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="🔍 स्टक खोज्नुस्..."
                style={{flex:1,minWidth:160,background:"#0d1929",border:"1px solid #1e293b",borderRadius:8,
                  padding:"7px 12px",color:"#e2e8f0",fontSize:11,fontFamily:"monospace",outline:"none"}}/>
              <select value={sort} onChange={e=>setSort(e.target.value)}
                style={{background:"#0d1929",border:"1px solid #1e293b",borderRadius:8,padding:"7px 10px",
                  color:"#94a3b8",fontSize:10,fontFamily:"monospace",outline:"none",cursor:"pointer"}}>
                <option value="signal">क्रम: संकेत</option>
                <option value="change">क्रम: परिवर्तन</option>
                <option value="rsi">क्रम: RSI</option>
                <option value="price">क्रम: मूल्य</option>
              </select>
            </div>

            <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
              {sectors.map(s=>(
                <button key={s} onClick={()=>setSector(s)} style={{
                  padding:"4px 10px",borderRadius:99,border:"1px solid",fontSize:10,cursor:"pointer",fontFamily:"monospace",
                  borderColor:sector===s?"#00ff9d":"#1e293b",
                  background:sector===s?"#00ff9d18":"transparent",
                  color:sector===s?"#00ff9d":"#475569"}}>
                  {s==="All"?"सबै":s}
                </button>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"90px 1fr 110px 110px 80px 70px 40px",
              gap:8,padding:"6px 14px",fontSize:9,color:"#334155",marginBottom:4}}>
              <span>संकेत</span><span>नाम</span><span>चार्ट</span>
              <span style={{textAlign:"right"}}>मूल्य</span>
              <span style={{textAlign:"center"}}>संकेत</span>
              <span style={{textAlign:"center"}}>RSI</span>
              <span style={{textAlign:"center"}}>★</span>
            </div>

            {displayStocks().map(stock=>(
              <div key={stock.symbol} onClick={()=>openStock(stock)}
                style={{display:"grid",gridTemplateColumns:"90px 1fr 110px 110px 80px 70px 40px",
                  gap:8,alignItems:"center",padding:"10px 14px",
                  background:"#0d1929",border:"1px solid #ffffff08",borderRadius:10,marginBottom:5,cursor:"pointer"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#00ff9d33"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="#ffffff08"}>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:"#e2e8f0",fontFamily:"monospace"}}>{stock.symbol}</div>
                  <div style={{fontSize:9,color:"#334155"}}>{stock.sector}</div>
                </div>
                <div style={{fontSize:10,color:"#64748b"}}>{stock.name.length>22?stock.name.slice(0,22)+"…":stock.name}</div>
                <Spark data={stock.ohlcv} color={stock.ind.color} w={100} h={32}/>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:13,fontWeight:700,fontFamily:"monospace"}}>रु.{stock.ind.curPrice.toFixed(0)}</div>
                  <div style={{fontSize:10,color:stock.ind.changePct>=0?"#00ff9d":"#ff4d6d",fontWeight:700}}>
                    {stock.ind.changePct>=0?"▲":"▼"} {Math.abs(stock.ind.changePct)}%
                  </div>
                </div>
                <div style={{textAlign:"center"}}>
                  <Badge signal={stock.ind.signal} color={stock.ind.color} bg={stock.ind.bg} small/>
                </div>
                <div style={{textAlign:"center",fontSize:12,fontWeight:700,fontFamily:"monospace",
                  color:stock.ind.rsi<30?"#00ff9d":stock.ind.rsi>70?"#ff4d6d":"#fbbf24"}}>
                  {stock.ind.rsi}
                </div>
                <div style={{textAlign:"center"}}>
                  <button onClick={e=>{e.stopPropagation();toggleWL(stock.symbol);}} style={{
                    background:"none",border:"none",cursor:"pointer",fontSize:16,
                    color:watchlist.includes(stock.symbol)?"#fbbf24":"#334155",padding:0}}>
                    {watchlist.includes(stock.symbol)?"★":"☆"}
                  </button>
                </div>
              </div>
            ))}
            {displayStocks().length===0&&(
              <div style={{textAlign:"center",padding:40,color:"#334155",border:"1px dashed #1e293b",borderRadius:12}}>
                {tab==="watchlist"?"वाचलिस्टमा कुनै स्टक छैन। ☆ थिचेर थप्नुस्।":"कुनै स्टक भेटिएन।"}
              </div>
            )}
          </>
        )}

        {/* SIGNALS */}
        {!selected&&tab==="signals"&&(
          <>
            <div style={{fontSize:10,color:"#475569",marginBottom:14}}>🔴 लाइभ संकेत स्क्यानर</div>
            {["STRONG BUY","BUY","HOLD","SELL","STRONG SELL"].map(sig=>{
              const group=allStocks.filter(s=>s.ind.signal===sig);
              if(!group.length)return null;
              const col=group[0].ind.color;
              const label=sig==="STRONG BUY"?"कडा किन्नुस्":sig==="BUY"?"किन्नुस्":sig==="HOLD"?"होल्ड":sig==="SELL"?"बेच्नुस्":"कडा बेच्नुस्";
              return(
                <div key={sig} style={{marginBottom:20}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:col}}/>
                    <span style={{fontSize:11,fontWeight:700,color:col,fontFamily:"monospace"}}>{label} ({group.length})</span>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {group.sort((a,b)=>b.ind.conf-a.ind.conf).map(s=>(
                      <div key={s.symbol} onClick={()=>openStock(s)}
                        style={{background:"#0d1929",border:`1px solid ${col}33`,borderRadius:8,
                          padding:"10px 14px",cursor:"pointer",minWidth:110}}
                        onMouseEnter={e=>e.currentTarget.style.background="#162032"}
                        onMouseLeave={e=>e.currentTarget.style.background="#0d1929"}>
                        <div style={{fontWeight:700,fontSize:13,color:col,fontFamily:"monospace"}}>{s.symbol}</div>
                        <div style={{fontSize:10,color:"#475569"}}>रु.{s.ind.curPrice.toFixed(0)}</div>
                        <div style={{fontSize:9,color:s.ind.changePct>=0?"#4ade80":"#f87171"}}>
                          {s.ind.changePct>=0?"▲":"▼"} {Math.abs(s.ind.changePct)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* TOP PICKS */}
        {!selected&&tab==="top"&&(
          <>
            <div style={{fontSize:10,color:"#475569",marginBottom:16}}>🏆 आजको शीर्ष छनोट</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#00ff9d",marginBottom:10}}>● शीर्ष खरिद संकेत</div>
                {topBuys.map((s,i)=>(
                  <div key={s.symbol} onClick={()=>openStock(s)}
                    style={{background:"#0d1929",border:"1px solid #00ff9d22",borderRadius:10,padding:"12px 14px",
                      marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#00ff9d55"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="#00ff9d22"}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:18,fontWeight:800,color:"#1e3a2a",width:24,textAlign:"center"}}>{i+1}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:13,color:"#00ff9d",fontFamily:"monospace"}}>{s.symbol}</div>
                        <div style={{fontSize:9,color:"#475569"}}>{s.name.slice(0,18)}</div>
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:12,fontWeight:700,fontFamily:"monospace"}}>रु.{s.ind.curPrice.toFixed(0)}</div>
                      <Badge signal={s.ind.signal} color={s.ind.color} bg={s.ind.bg} small/>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#ff4d6d",marginBottom:10}}>● शीर्ष बिक्री संकेत</div>
                {topSells.map((s,i)=>(
                  <div key={s.symbol} onClick={()=>openStock(s)}
                    style={{background:"#0d1929",border:"1px solid #ff4d6d22",borderRadius:10,padding:"12px 14px",
                      marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#ff4d6d55"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="#ff4d6d22"}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:18,fontWeight:800,color:"#3a1e1e",width:24,textAlign:"center"}}>{i+1}</span>
                      <div>
                        <div style={{fontWeight:700,fontSize:13,color:"#ff4d6d",fontFamily:"monospace"}}>{s.symbol}</div>
                        <div style={{fontSize:9,color:"#475569"}}>{s.name.slice(0,18)}</div>
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:12,fontWeight:700,fontFamily:"monospace"}}>रु.{s.ind.curPrice.toFixed(0)}</div>
                      <Badge signal={s.ind.signal} color={s.ind.color} bg={s.ind.bg} small/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0d1929}
        ::-webkit-scrollbar-thumb{background:#1e293b;border-radius:2px}
        input::placeholder{color:#334155}
        select option{background:#0d1929}
      `}</style>
    </div>
  );
}
