/*
 * Paper.js
 *
 * This file is part of Paper.js, a JavaScript Vector Graphics Library,
 * based on Scriptographer.org and designed to be largely API compatible.
 * http://paperjs.org/
 * http://scriptographer.org/
 *
 * Copyright (c) 2011, Juerg Lehni & Jonathan Puckey
 * http://lehni.org/ & http://jonathanpuckey.com/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 */

/**
 * @name HitResult
 *
 * @class A HitResult object contains information about the results of a hit
 * test. It is returned by {@link Item#hitTest(point)} and
 * {@link Project#hitTest(point)}.
 */
HitResult = Base.extend(/** @lends HitResult# */{
	initialize: function(type, item, values) {
		this.type = type;
		this.item = item;
		// Inject passed values, so we can be flexible about the HitResult
		// properties.
		// This allows the definition of getters too, e.g. for 'pixel'.
		if (values)
			this.inject(values);
	},

	/**
	 * Describes the type of the hit result. For example, if you hit a segment
	 * point, the type would be 'segment'.
	 *
	 * @name HitResult#type
	 * @property
	 * @type String('segment', 'handle-in', 'handle-out', 'stroke', 'fill',
	 * 'bounds', 'center', 'pixel')
	 */

	/**
	 * If the HitResult has a {@link HitResult#type} of 'bounds', this property
	 * describes which corner of the bounding rectangle was hit.
	 *
	 * @name HitResult#name
	 * @property
	 * @type String('top-left', 'top-right', 'bottom-left', 'bottom-right',
	 * 'left-center', 'top-center', 'right-center', 'bottom-center')
	 */

	/**
	 * The item that was hit.
	 *
	 * @name HitResult#item
	 * @property
	 * @type Item
	 */

	/**
	 * If the HitResult has a type of 'stroke', this property gives more
	 * information about the exact position that was hit on the path.
	 *
	 * @name HitResult#location
	 * @property
	 * @type CurveLocation
	 */

	/**
	 * If the HitResult has a type of 'pixel', this property refers to the color
	 * of the pixel on the {@link Raster} that was hit.
	 *
	 * @name HitResult#color
	 * @property
	 * @type RgbColor
	 */

	/**
	 * If the HitResult has a type of 'stroke', 'segment', 'handle-in' or
	 * 'handle-out', this property refers to the Segment that was hit or that
	 * is closest to the hitResult.location on the curve.
	 *
	 * @name HitResult#segment
	 * @property
	 * @type Segment
	 */

	/**
	 * Describes the actual coordinates of the segment, handle or bounding box
	 * corner that was hit.
	 *
	 * @name HitResult#point
	 * @property
	 * @type Point
	 */

	statics: {
		/**
		 * Merges default options into options hash for #hitTest() calls, and
		 * marks as merged, to prevent repeated merging in nested calls.
		 *
		 * @private
		 */
		getOptions: function(point, options) {
			return options && options._merged ? options : Base.merge({
				// Use the converted options object to perform point conversion
				// only once.
				point: Point.read(arguments, 0, 1),
				// Type of item, for instanceof check: PathItem, TexItem, etc
				type: null,
				// Tolerance
				tolerance: 2,
				// Hit the fill of items
				fill: !options,
				// Hit the curves of path items, taking into account the stroke
				// width.
				stroke: !options,
				// Hit the part of segments that curves pass through, excluding
				// its segments (Segment#point)
				segments: !options,
				// Hit the parts of segments that define the curvature
				handles: false,
				// Only first or last segment hits on path (mutually exclusive
				// with segments: true)
				ends: false,
				// Hit test the center of the bounds
				center: false,
				// Hit test the corners and side-centers of the boudning box
				bounds: false,
				//  Hit items that are marked as guides
				guides: false,
				// Only hit selected objects
				selected: false,
				// Mark as merged, so next time Base.merge isn't called
				_merged: true
			}, options);
		}
	}
});
