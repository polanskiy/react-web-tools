import React, { Children, useEffect, useState, useCallback } from 'react';
import './carousel.css';

const Carousel = ({
  initialSlide,
  children,
  autoPlayInterval,
  arrows,
  dots,
  transitionDuration,
  transitionTimingFunction,
  carouselClass,
  dotsBoxClass,
  arrowsBoxClass
}) => {
  const [slide, setSlide] = useState(initialSlide);
  const [dragging, setDragging] = useState(null);
  const [sliding, setSliding] = useState(false);
  const [offset, setOffset] = useState(0);
  const changeSlide = useCallback(sld => {
    if (document.hidden) return;

    if (sld >= 0 && sld <= React.Children.count(children) + 1) {
      setSlide(sld);
      setSliding(true);
      setDragging(null);
      setOffset(0);
    }
  }, [children]);
  useEffect(() => {
    let timer;

    if (Children.count(children) > 1 && autoPlayInterval > 0) {
      timer = window.setInterval(() => changeSlide(slide + 1), autoPlayInterval);
    }

    return () => {
      clearInterval(timer);
    };
  }, [slide, dragging, autoPlayInterval, changeSlide, children]);

  const onTransitionEnd = () => {
    let newSlide = slide;
    const count = Children.count(children);
    if (slide === count + 1) newSlide = 1;
    if (slide === 0) newSlide = count;
    setSlide(newSlide);
    setSliding(false);
  };

  const onDraggingStart = event => {
    if (event.touches) {
      setDragging({
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      });
      setOffset(0);
    }
  };

  const onDraggingMove = event => {
    if (sliding || !dragging || !event.touches) return;
    const x = event.touches[0].pageX;
    const y = event.touches[0].pageY;
    const newOffset = x - dragging.x;
    if (Math.abs(y - dragging.y) < Math.abs(offset)) event.preventDefault();
    setOffset(newOffset);
  };

  const onDraggingEnd = event => {
    const sliderWidth = event.currentTarget.clientWidth;
    if (!dragging) return;
    const target = Math.abs(offset) > sliderWidth / 5 ? offset > 0 ? slide - 1 : slide + 1 : slide;

    if (Math.abs(Math.abs(dragging.x) - event.nativeEvent.changedTouches[0].pageX) > 5) {
      setDragging(null);
      changeSlide(target);
    }
  };

  const onClick = event => {
    if (Math.abs(offset) < 25) return;
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
  };

  const goPrevSlide = () => changeSlide(slide - 1);

  const goNextSlide = () => changeSlide(slide + 1);

  const slides = Children.map(children, child => React.cloneElement(child, {
    key: `${child.key}_clone`
  }));
  const count = Children.count(children);
  const enabled = count > 1;
  const slideStyle = {
    flexBasis: '100%',
    flexShrink: 0
  };
  return React.createElement("div", {
    className: carouselClass,
    style: {
      position: 'relative',
      overflowX: 'hidden',
      touchAction: 'pan-y pinch-zoom'
    }
  }, React.createElement("ul", {
    role: "presentation",
    style: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      transitionProperty: sliding ? 'transform' : 'none',
      transform: enabled ? offset !== 0 ? `translateX(calc(${offset * 1}px - ${slide * 100}%))` : `translateX(-${slide * 100}%)` : null,
      transitionDuration: `${transitionDuration}s`,
      transitionTimingFunction,
      contain: 'layout',
      willChange: 'transform'
    },
    onTransitionEnd: onTransitionEnd,
    onTouchStart: onDraggingStart,
    onTouchMove: onDraggingMove,
    onTouchEnd: onDraggingEnd,
    onTouchCancel: onDraggingEnd,
    onClick: onClick
  }, enabled ? Children.map(slides.slice(-1).concat(children, slides.slice(0, 1)), (item, index) => React.createElement("li", {
    "aria-current": slide === index,
    style: slideStyle
  }, item)) || React.createElement("li", null, children) : null), enabled && dots && React.createElement("ol", {
    className: dotsBoxClass
  }, Children.map(children, (item, index) => React.createElement("li", {
    role: "presentation",
    "aria-current": slide === index + 1,
    onClick: () => changeSlide(index + 1)
  }, index + 1))), enabled && arrows && React.createElement("div", {
    className: arrowsBoxClass
  }, React.createElement("button", {
    type: "button",
    className: "prevArr",
    onClick: goPrevSlide
  }), React.createElement("button", {
    type: "button",
    className: "nextArr",
    onClick: goNextSlide
  })));
};

Carousel.defaultProps = {
  carouselClass: 'carousel',
  initialSlide: 1,
  transitionTimingFunction: 'ease-in-out',
  transitionDuration: 0.5,
  autoPlayInterval: 3000,
  arrows: true,
  dots: true,
  dotsBoxClass: 'dotsBox',
  arrowsBoxClass: 'arrsBox',
  nextArrClass: 'nextArr',
  prevArrClass: 'prevArr'
};
export default Carousel;