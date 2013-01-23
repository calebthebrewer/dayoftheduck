<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content
 * after.  Calls sidebar-footer.php for bottom widgets.
 */
?>
		</div><!-- #content -->
	<div id="darkness"></div>
	</div><!-- #container -->
	</div><!-- #main -->

	<footer role="contentinfo">
		<div id="footer-wrapper">
		</div><!-- #footer-wrapper -->
	</footer><!-- #footer -->

</div><!-- #wrapper -->


<?php
	/* Always have wp_footer() just before the closing </body>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to reference JavaScript files.
	 */

	wp_footer();
?>
</body>
</html>
