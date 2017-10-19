import React from 'react';
import './App.css';
import './bootstrap.min.css';

class FinalRender extends React.Component {
    constructor () {
    super();
    const recipeInfo = {
      data : [
        {
          "name": "Mediterranean Chicken and Pasta",
          "ingredients": "1 6 - ounce jar marinated artichoke hearts,1 tablespoon olive oil,12 ounces skinless, boneless chicken breast & cut into bite-size pieces,3 garlic cloves & thinly sliced,1/4 cup chicken broth,1/4 dry white wine 1 teaspoon dried oregano, crushed 1 7 - ounce jar roasted red peppers, drained and cut into strips,1/4 cup pitted kalamata olives 3 cups hot cooked campanelle or penne pasta,1/4 cup crumbled feta cheese (optional)",
          "img": "https://images.meredith.com/fitness/images/recipe/ss_R137043.jpg",
          "step1": "Drain artichoke hearts, reserving marinade, and chop them. In a large skillet, heat oil over medium-high heat; add chicken and garlic. Cook and stir until chicken is brown. Add the reserved artichoke marinade, broth, wine and dried oregano.\nBring to a boil; reduce heat. Simmer & covered. 10 minutes. Stir in chopped artichokes, roasted peppers and olives.\nTo serve, spoon chicken mixture over pasta. If desired, sprinkle with feta cheese."
        },
      {
        "name": "Quick Chicken Nuggets",
        "ingredients": "1 cup bread crumbs, 1/2 teaspoon garlic powder, 1/2 teaspoon dried thyme, 1/4 cup Dijon mustard, 1/3 cup light mayonnaise, 1 1/2 pounds chicken tenders & cut into 1-inch pieces, 3/4 pound green beans & washed & trimmed & steamed",
        "img": "https://images.meredith.com/bhg/images/recipe/p_R115589.jpg",
        "step1": "Heat oven to broil. Coat baking rack with nonstick cooking spray. Place rack over baking sheet; set aside.\nStir together bread crumbs, garlic powder and thyme in a pie plate; set aside. Stir together mustard and mayonnaise.\nReserve about 1/2 cup of mustard mixture for dipping sauce. Brush chicken pieces with remaining mustard mix; place chicken in pie plate with bread crumb mixture, spooning crumbs on top of pieces and pressing to adhere. Transfer to prepared baking rack. Broil for 10 minutes or until cooked through. Serve with reserved dipping sauce and green beans on the side."
      }
      ]
    }
    const showEdit = false;
    this.state = { 
      recipeInfo:JSON.parse(localStorage.getItem('recipeInfo')) || recipeInfo.data,
      showWindow: false,
      name: "",
      img: "",
      ingredients: "",
      step1: "",
      showRecipe: false,
      showEdit: false,
      index: recipeInfo.data.length+1
    };
    this.closeWindow = this.closeWindow.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
deleteItem(item) {
	/*
  //if (confirm('Are you sure you want to delete this item?')) {
  const clickedDelete = this.state.recipeInfo;
  clickedDelete.splice(item,1);
  this.setState({ recipeInfo: clickedDelete
},() => {
    localStorage.setItem('recipeInfo', JSON.stringify(this.state.recipeInfo));
  });
  //}
  * */
}

handleInput(e) {
  this.setState({[e.target.name]: e.target.value});
}

handleSubmit(event) {
event.preventDefault();
const recipe = {
  name: this.state.name,
  ingredients: this.state.ingredients,
  img: this.state.img,
  step1: this.state.step1
};
  
  if (this.state.name ==="" || this.state.ingredients === "") {
    alert("Please fill in name and ingredients!")
    return false;
  }

  if(this.state.index <= this.state.recipeInfo.length) {
    const currentArray = this.state.recipeInfo.slice();
    currentArray[this.state.index] = recipe;
    this.setState({ 
      recipeInfo: currentArray,
      showWindow: false
    },() => {
        localStorage.setItem('recipeInfo', JSON.stringify(this.state.recipeInfo));
    });
  } else {
    const currentArray = this.state.recipeInfo.slice();
    currentArray.push(recipe);
    this.setState({ 
      recipeInfo: currentArray,
      showWindow: false
    },() => {
        localStorage.setItem('recipeInfo', JSON.stringify(this.state.recipeInfo));
    });
  }
}

handleEdit (index,event) {

if(event.target.id === "new") {
  this.setState({ 
    name: "",
    img: "",
    ingredients: "",
    step1: "",
    showWindow: true,
    showRecipe: false,
    showEdit: true,
    index: this.state.recipeInfo.length+1
});
} else {
  this.setState({ 
  name: this.state.recipeInfo[index].name,
  img: this.state.recipeInfo[index].img,
  ingredients: this.state.recipeInfo[index].ingredients,
  step1: this.state.recipeInfo[index].step1,
  index: index,
  showWindow: true
});
  if (event.target.id === "edit_" + index) {
    this.setState({ 
    showRecipe: false,
    showEdit: true
});
  } else if (event.target.name === "more_" + index) {
    this.setState({ 
    showRecipe: true,
    showEdit: false
});
    console.log(document.getElementById("overlay"));
  }
}
}

closeWindow(event) {
  this.setState({ showWindow: false });
}
  render() {
    return (
    <div>
    <RecipeBox 
      recipeInfo={this.state.recipeInfo}
      deleteItem={this.deleteItem}
      handleEdit={this.handleEdit} />
     <div className="overlay" style={{ 
              opacity: this.state.showWindow ? '1' : '0',
              height: this.state.showWindow ? '100%' : '0'
          }}>
    <CreateItem
      showWindow={this.state.showWindow}
      closeWindow={this.closeWindow}
      name={this.state.name}
      ingredients={this.state.ingredients}
      img={this.state.img}
      index={this.state.index}
      step1={this.state.step1}
      showRecipe={this.state.showRecipe}
      handleSubmit={this.handleSubmit}
      handleInput={this.handleInput}
      />
        </div>
     </div>
    );
  }
}

class RecipeBox extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
  <div className="container-fluid">
        
   <h1 class="recipeTitle">Recipe Box</h1>
   <button className="btn btn-primary buttonStyle" onClick={this.props.handleEdit.bind(null,this.props.recipeInfo.length+1)} id="new">Add New Item</button>
        {this.props.recipeInfo.map((data,index) => 
          <div className="row" key={index}>
          <div className="col-sm-6">
            <a onClick={this.props.handleEdit.bind(this).bind(null,index)}><img name={"more_"+ index} src={data.img} alt={data.name} className="receipeImage" /></a>
          </div>
          <div className="col-sm-6 receipe" id={data.name}>          
            <h3 className="recipeTitle">{data.name}</h3>
            <p className="recipeIngred">Ingredients: <ul>{data.ingredients.split(",").map((data,index) => <li key={index}>{data}</li>)}</ul></p>
            <button className="btn btn-info buttonStyle" name={"more_"+ index} onClick={this.props.handleEdit.bind(this).bind(null,index)}>More</button>
            <button className="btn btn-success buttonStyle" id={"edit_"+ index} onClick={this.props.handleEdit.bind(this).bind(null,index)}>Edit</button>
            <button className="btn btn-danger buttonStyle" onClick={this.props.deleteItem.bind(null,index)}>Delete</button>
          </div>
          </div>
          )}
        <div>

    </div>
   </div>
  );
  }
}

class CreateItem extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
  <div className="container-fluid recipeBlock">
        
        <div style={{ display: this.props.showRecipe ? 'block' : 'none' }}>
          <h2 className="recipeHeader">{this.props.name}</h2>
          <h3>Ingredients</h3> <ul>{this.props.ingredients.split(",").map((data,index) => <li key={index}>{data}</li>)}</ul>
          <h3>Steps</h3> <ol>{this.props.step1.split("\n").map((data,index) => <li key={index}>{data}</li>)}</ol>
          <div><img src={this.props.img} alt={this.props.name} width="100%" /></div>
    </div>

     <div className="form-group" style={{ display: this.props.showRecipe ? 'none' : 'block' }}>
      <form onSubmit={this.props.handleSubmit}>
        <div className="col-xs-10">
         <label>Name (*)</label>
          <input type="text" name="name" id="name" className="form-control input-lg" placeholder="Enter name" value={this.props.name} onChange={this.props.handleInput} />  <small id="HelpInline" class="text-muted">* Required field</small>
            </div>
        <div class="col-xs-10">
         <label>Ingredients (*)</label>
          <textarea className="form-control" id="ingredients" rows="5" value={this.props.ingredients} name="ingredients" onChange={this.props.handleInput} placeholder="Enter ingredients, comma separated." /> <small id="HelpInline" class="text-muted">* Required field, comma separated</small>
            </div>
        <div class="col-xs-10">
         <label>Image</label>
          <input type="text" name="img" id="img" className="form-control input-lg" placeholder="Enter Image Link, e.g. http://www.abc.com/image.jpg" value={this.props.img} onChange={this.props.handleInput} />
            </div>
        <div class="col-xs-10">
         <label>Steps</label>
          <textarea className="form-control" id="steps" rows="5" value={this.props.step1} name="step1" onChange={this.props.handleInput} placeholder="Enter steps, create new line for new steps" />
         </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
     </div>

        <button className="btn btn-primary buttonStyle closeButton" onClick={this.props.closeWindow}> X </button>

     </div>
    );
  }
}

export default FinalRender;
