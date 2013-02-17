<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
		<article class="single">
			<div class="shadow">
				<div class="content-wrap">
					<div class="content">
						<h1><?php the_title(); ?></h1>
						<?php the_content(); ?>
					</div>
				</div>	
			</div>	
		</article>
<?php endwhile; endif;