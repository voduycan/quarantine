<?php // Template Name: Play Video Page 

// get header.php

get_header();



?>

<?php 

	$i =  $_GET['ID'];
	$rows = get_field('add_video',3781);
	$row = $rows[$i];
	$row_video = $row['add_url'];
	$row_title = $row['title'];

?>

<div id="play-video">
	<?php echo $row_video; ?>
	
</div>
<div id="play-title">
	<h3><?php echo $row_title; ?></h3>
</div>




<!-- get footer.php -->
<?php get_footer();  ?>