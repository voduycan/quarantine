<?php // Template Name: Video Page 

// get header.php

get_header();

?>

 <?php if( have_rows('add_video') ): $num = 0;?>
	<div id="row-video">
		<?php
			while( have_rows('add_video') ): the_row(); 
				// vars
				$title = get_sub_field('title');
				$image = get_sub_field('image');
				
		?>	
			<div class="video-item">
				<div class="video-image"><img class="img-background" src="<?php echo $image; ?>"></div>
				<a class="title" href="<?php echo 'play-video?ID='.$num; $num++; ?>">
					<h3><?php echo $title; ?></h3>
				</a>
				<img class="play-button" src="<?php bloginfo('template_url'); ?>/img/play-button.svg">
			</div>


		<?php endwhile; ?>
	</div>
<?php endif; ?>


<h1 class="h1-header">Luxury Residential & Office Interior Designer Singapore</h1>


<!-- get footer.php -->
<?php get_footer();  ?>