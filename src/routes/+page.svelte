<script lang="ts">
    let i: HTMLInputElement;
    
</script>

<h1>Form Test</h1>

<form method="POST" enctype="application/x-www-form-urlencoded">
    <input  type="number" name="number" />
    <input type="text" name="text" />
    <input type="date" name="date" />
    <input type="file" name="file" />
    <input type="text" disabled />
    <input type="submit" />
</form>