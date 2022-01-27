import React,{useEffect,useState} from 'react'

import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'



// export class News extends Component {
  // static defaultProps = {
  //   country: 'in',
  //   pageSize: 6,
  //   category:'general',                                // props type in class based component
  // }
  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // }
  const News=(props)=>{
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    
  const capFirstLet=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }   
  //  constructor(props){
  //       super(props);
  //        this.state={
  //              articles: [],
  //              loading : true,               //when we use class based function then we use this.state and to use this.state
  //              page : 1,                     // we use constructor
  //              totalResults: 0
  //        }
        
  //   }


    const updateNews= async ()=>{
      props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setloading(true)
      let data=await fetch(url);
      props.setProgress(30);
      let parsedData=await data.json()
      props.setProgress(70);
      console.log(parsedData);
      setarticles(parsedData.articles)
      settotalResults(parsedData.totalResults)
      setloading(false)
      
       props.setProgress(100);
    }
    useEffect(() => {
      document.title=`${capFirstLet(props.category)}-NewsX`;
      updateNews();
      //eslint-disable-next-line
    }, []);
    
    // async componentDidMount(){
    //    console.log("cdm");
    //    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    //    this.setState({loading:true});
    //    let data=await fetch(url);
    //    let parsedData=await data.json()
    //    console.log(parsedData);
    //    this.setState({
    //      articles : parsedData.articles,
    //      totalResults : parsedData.totalResults,
    //      loading : false
    //     })
    //   this.updateNews();
    // }

    // handlePrevClick=async ()=>{
    //   // console.log("Previous");
    //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //   // this.setState({loading:true});
    //   // let data=await fetch(url);
    //   // let parsedData=await data.json()
    //   // this.setState({
    //   //   page : this.state.page - 1,
    //   //   articles : parsedData.articles,
    //   //   loading : false
    //   // })
    //   this.setState({page:this.state.page - 1})
      
    // }

    // handleNextClick=async ()=>{
    // //   console.log("Next");
    // //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){

    // //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    // //     this.setState({loading:true});
    // //     let data=await fetch(url);
    // //     let parsedData=await data.json()
    // //     this.setState({
    // //       page : this.state.page + 1,
    // //       articles : parsedData.articles,
    // //       loading : false
    // //     })
    // // }
    //   this.setState({page:this.state.page + 1})
    //   this.updateNews();
     

    // }
    const fetchMoreData = async() => {
      // this.setState({page:this.state.page + 1})
      
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setpage(page + 1)
      // this.setState({loading:true});
      let data=await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);
      setarticles(articles.concat(parsedData.articles))
      settotalResults(parsedData.totalResults)
      // this.setState({
      //   articles : this.state.articles.concat(parsedData.articles),
      //   totalResults : parsedData.totalResults
      //   //  loading : false
      //  })

    };



    
  
        return (
            <div className="container">
                <h1 className="text-center" style={{margin:'40px 0px',marginTop:'90px'}}>NewsX- Top {capFirstLet(props.category)} Headlines</h1>
                {loading && <Spinner/>}
                <InfiniteScroll
                  dataLength={articles.length}
                  next={fetchMoreData}
                  hasMore={articles.length !==totalResults}
                  loader={<Spinner/>}
                >
                  <div className="container">

                  
                <div className="row">
               
                {articles.map((element)=>{
                     return <div className="col-md-4" key ={element.url}>
                        <Newsitem title={element.title? element.title:""} description={element.description? element.description:""} newsurl={element.url}
                         imageurl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                     </div>
                    })}
                    
                </div>
                </div>
                </InfiniteScroll>
                
                
                </div>
        )
    }


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category:'general',                                // props type in function based component
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

export default News
