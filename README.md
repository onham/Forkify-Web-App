# Forkify-Web-App
An application to search through more than 1 million recipes on the internet.

**Forkify**

Forkify is a web application that makes use of the Food2Fork Recipe API ( [https://food2fork.com/about/api](https://food2fork.com/about/api)) to allow the user to search through more than one million recipes.
***

**Using Forkify**

![Application start view](https://lh3.googleusercontent.com/hY_OxJSdaUf_0taVhp-3M5AGb_SK6AY9t30viR1pyXVYH618EhxI19TQmlfVhfZS9ZR_XYH4rSZIiw)

Upon loading the app for the first time, it will appear as in the screen above.

1.    The search bar allows the user to enter any keyword to generate relevant recipes.

2.    The shopping list will fill with ingredients once items are added to it.
***

![Search view](https://lh3.googleusercontent.com/T96ho2vIpnTWE1wlrWJgjByLoz4jN0-k1z6vvHpVpkoYAfqHgRbQpxSddN-9iABcqm8PlWTKxITpsw)

Once a search is made, the results show up on the left side of the page (1). Recipes are selected (2) through a click on an entry - the entire recipe is shown in the centre of the page.
***

![Recipe view](https://lh3.googleusercontent.com/E1HA_Ey9ZFxlwc4XWrJYFMLxC9z0Y2WsolBhj9g6GHowaPnB5-26BO2dyCZ7eLxPL6ScehZGPPaOYw)

1.    The serving amount can be adjusted (a hover over the text will reveal buttons to toggle the quantity), which will also adjust the number of ingredients required.

2.    The like button enables users to save a recipe to memory.

3.    This button allows ingredients to be added to a shopping list.

4.    Clicking on this will redirect the user to the website where this recipe was originally fetched from.
***

![Shopping list view](https://lh3.googleusercontent.com/3LbZO1V9cIzMoIafwuwEs24dXNo7gFylnGMwp9J_fU92BwAw8HG4Iooeh8vGZpyPtZNQfi_bTLQ1Lw)

1.    Once a recipe is liked, the user can see a list of saved recipes by hovering over the heart icon.

2.    Ingredients added to the shopping list are displayed here, and the quantities can be adjusted accordingly.
***

![Liked recipes view](https://lh3.googleusercontent.com/HpOYKuL__2jbeUWXhPSvq5G157FgvHJnNqOU_bm2dpLWs2g_l4qAR-4-I1w4Q5VmUCKiDs3PBjiWOg)

Any recipes liked is displayed in the list (1) - currently, clicking on any of the links will not load the recipe. This will be implemented in future updates. All liked recipes are saved within local storage and will remain if the browser is closed and reopened.
