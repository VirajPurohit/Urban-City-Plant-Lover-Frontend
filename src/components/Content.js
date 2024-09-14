import React from "react";
import { Carousel, Card } from "react-bootstrap";
import "./Content.css";

export default function Content() {
  return (
    <div className="Content-Wrapper">
      <h2> Benefits of Gardening</h2>
      <div className="gardening-tips">
        <br />
        <Carousel>
          <Carousel.Item interval={5000}>
            <div className="d-flex flex-row">
              <img
                src={require("../assets/Gardening-Benefits-Images/Gardening1.jpg")}
                height={100}
                width={120}
              />
              <div className="text-wrapper">
                <h4 className="slide-title">
                  Gardening can build self-esteem.{" "}
                </h4>
                <p className="slide-description">
                  Maybe you don’t think you were born with a green thumb, but
                  after tilling, planting, nurturing and harvesting plants, you
                  might see a slightly different person in the mirror: a person
                  who can grow things and is a little more in tune with the
                  earth. It always feels good to accomplish new tasks, and if
                  you can grow a garden, what can’t you do?
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <div className="d-flex flex-row">
              <img
                src={require("../assets/Gardening-Benefits-Images/Gardening2.jpg")}
                height={100}
                width={120}
              />
              <div className="text-wrapper">
                <h4 className="slide-title">
                  Gardening is good for your heart.
                </h4>
                <p className="slide-description">
                  All that digging, planting and weeding burns calories and
                  strengthens your heart. “There are physical benefits from
                  doing the manual labor of gardening,” says UNC Health internal
                  medicine physician Robert Hutchins, MD, MPH. “It’s hard work
                  to garden, and it provides some cardiovascular benefit.”
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <div className="d-flex flex-row">
              <img
                src={require("../assets/Gardening-Benefits-Images/Gardening3.jpg")}
                height={100}
                width={120}
              />
              <div className="text-wrapper">
                <h4 className="slide-title">Gardening reduces stress.</h4>
                <p className="slide-description">
                  Gardening can help reduce symptoms of depression and anxiety.
                  “Gardening gives you a chance to focus on something and put
                  your mind to work with a goal and a task in mind,” Dr.
                  Hutchins says, “which is helpful especially now with so much
                  illness and death and talk of death, just to see things
                  growing and things thriving.”
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <div className="d-flex flex-row">
              <img
                src={require("../assets/Gardening-Benefits-Images/Gardening5.jpg")}
                height={100}
                width={120}
              />
              <div className="text-wrapper">
                <h4 className="slide-title">
                  Gardening is good for the whole family..
                </h4>
                <p className="slide-description">
                  Gardening can be a solo activity or an opportunity for bonding
                  with your family and friends. The happiness and stress relief
                  that gardening provides is a great thing to share with loved
                  ones. Also, gardening has special benefits for kids. Early
                  exposure to dirt has been linked to numerous health benefits,
                  from reducing allergies to autoimmune diseases.
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <div className="d-flex flex-row">
              <img
                src={require("../assets/Gardening-Benefits-Images/Gardening4.jpg")}
                height={100}
                width={120}
              />
              <div className="text-wrapper">
                <h4 className="slide-title">
                  Gardening can give you a boost of vitamin D.{" "}
                </h4>
                <p className="slide-description">
                  A healthy dose of vitamin D increases your calcium levels,
                  which benefits your bones and immune system. Exposure to
                  sunlight helped older adults achieve adequate amounts of
                  vitamin D. Just don’t forget your sunscreen.
                </p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <br />
      {/*---------------Urban Gardening Strategies Section -----------------*/}
      <div className="urban-gardening-tips-section">
        <h2> Urban Gardening Stratergies</h2>
        <p>
          Are you living in a small our concrete urban apartment and have no
          idea how to bring the dash of green into your life? Well we are here
          to assist! Urban garden layouts can be quite versatile, whether it's a
          balcony garden or a rooftop garden, so you don't have to live out in
          the country to enjoy growing your favourite plants and vegetables.
          With our urban gardening ideas, you'll find advice on how to start a
          garden of any size and will learn how to grow urban vegetable gardens
          and care for plants in the city, even if you live in an apartment.
        </p>
        <br />
        <div className="urban-gardening-carousel-wrapper">
          <Carousel>
            <Carousel.Item style={{ width: "500px" }} interval={15000}>
              <Card>
                <Card.Img
                  variant="top"
                  src={require("../assets/Urban-Gardening/Container-Gardening.jpg")}
                />
                <Card.Body>
                  <Card.Title>Container Gardening </Card.Title>
                  <Card.Text>
                    There are numerous gardening techniques available, but
                    container gardening is one the most effective ways to start
                    your gardening journey. Container gardening entails growing
                    plants in pots or containers. It's a simple and enjoyable
                    method to spruce up your porch or any apartment area
                    Container plants are a great way to make your area more
                    visually appealing.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            {/*-------------------------------------------------------------------*/}
            <Carousel.Item style={{ width: "500px" }} interval={15000}>
              <Card>
                <Card.Img
                  variant="top"
                  src={require("../assets/Urban-Gardening/Vertical_Garden.jpg")}
                />
                <Card.Body>
                  <Card.Title>Vertical Gardening </Card.Title>
                  <Card.Text>
                    Vertical gardening is the way to go if you're short on room
                    or need to build some screening to provide privacy on a
                    patio, deck, or balcony. Vertical gardening makes the most
                    of your growing space by using upright growth habits or
                    containers. It's a strategy that works both indoors and
                    outside!In a vertical environment, many various varieties of
                    houseplants, annuals, perennials, and shrubs work well, so
                    you're not limited in what you may use.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            {/*-------------------------------------------------------------------*/}
            <Carousel.Item style={{ width: "500px" }} interval={15000}>
              <Card>
                <Card.Img
                  variant="top"
                  src={require("../assets/Urban-Gardening/Square-Foot-Garden.jpg")}
                />
                <Card.Body>
                  <Card.Title>Square Foot Gardening </Card.Title>
                  <Card.Text>
                    A simple approach of constructing compact, organised, and
                    very productive kitchen gardens is square foot gardening. It
                    was conceived as a better way to cultivate a vegetable
                    garden by Mel Bartholomew. The main idea is this: Make a
                    small garden bed (4 feet by 4 feet or 4 feet by 8 feet are
                    typical sizes) and split it into a grid of 1-foot squares
                    that you tend separately. Each vegetable's seeds or
                    seedlings are planted in one or more squares, with a density
                    determined by plant size. There is no wasted area because
                    there are no walkways, and the dirt in the bed stays
                    loose.Intensive planting allows you to get a lot of produce
                    from a small space, making it excellent for gardeners with
                    limited space.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            {/*-------------------------------------------------------------------*/}
            <Carousel.Item style={{ width: "500px" }} interval={15000}>
              <Card>
                <Card.Img
                  variant="top"
                  src={require("../assets/Urban-Gardening/Hanging_Baskets_Garden.jpg")}
                />
                <Card.Body>
                  <Card.Title>Hanging Basket Plants </Card.Title>
                  <Card.Text>
                    Looking for a method to show off your indoor garden while
                    also giving your home a fresh lease on life? Hanging
                    planters are an excellent way to add lush, green intrigue
                    and beauty to every corner of your home or apartment.
                    They're also on-trend and perfect for folks with compact
                    living spaces because they don't take up any floor or
                    surface space. One of the best aspects of hanging planters
                    is that they are a simple and inexpensive DIY project that
                    anyone can do.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            {/*-------------------------------------------------------------------*/}
            <Carousel.Item style={{ width: "500px" }} interval={15000}>
              <Card>
                <Card.Img
                  variant="top"
                  src={require("../assets/Urban-Gardening/Shelf_Gardening.jpg")}
                  height={"450px"}
                />
                <Card.Body>
                  <Card.Title>Shelf Gardening </Card.Title>
                  <Card.Text>
                    Not convinced with attaching your plants with walls or in
                    Hanging Planters ? Don’t worry, We have another solution for
                    you, Shelf Gardening. A garden shelf is a lovely way to
                    display the results of your green thumb. If you have a small
                    balcony and want to make the most of it, consider putting
                    shelving along the walls to create more uncrowded green
                    area. The plants' height will draw the eye upward, giving
                    the impression of a larger balcony. A garden shelf can
                    significantly increase the amount of space available for
                    your plants while only requiring a small amount of time and
                    work to construct. This can be a fun DIY too that can be
                    undertaken alone or with your family.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            {/*-------------------------------------------------------------------*/}
            <Carousel.Item style={{ width: "500px" }} interval={15000}>
              <Card>
                <Card.Img
                  variant="top"
                  src={require("../assets/Urban-Gardening/Window-Sill-Gardening.jpg")}
                />
                <Card.Body>
                  <Card.Title>Window Sill Gardening </Card.Title>
                  <Card.Text>
                    A window Sill garden is basically a garden planned and
                    planted right on your window sill either indoors or in a
                    hanging window box outside your home. Window sill gardens
                    are a great space-saving option for gardeners who don’t have
                    large outdoor gardening space or open balconies to keep
                    their plants. You can grow flowers, creepers, herbs and even
                    a few veggies on your window sill provided with proper
                    planning. You just need to make sure that there is enough
                    light and your potting soil is right for the conditions
                    prevalent on your window sills. Window sill gardens are also
                    cost-effective and easy to get started with.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
            {/*-------------------------------------------------------------------*/}
            <Carousel.Item style={{ width: "500px" }} interval={15000}>
              <Card>
                <Card.Img
                  variant="top"
                  src={require("../assets/Urban-Gardening/Fence-Planters.jpg")}
                />
                <Card.Body>
                  <Card.Title>Using Fence Planters</Card.Title>
                  <Card.Text>
                    Fence planters are one of the most effective methods to
                    brighten up a terrace fences or railings by bringing the
                    colours of flowers and plants up to eye level from the
                    ground. It can truly bring a garden to life and is a
                    terrific way to give your backyard some flair. Some people,
                    the handy ones, can make homemade planters out of almost
                    anything, while others prefer to buy them ready-made.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
