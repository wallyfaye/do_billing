# Multiples of 3 and 5

# If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
# Find the sum of all the multiples of 3 or 5 below 1000.

function some_func()
{
	sum=0;
	start_num=1;
	end_num=1000;

	for (( c=$start_num; c<$end_num; c++ ))
	do
		mod_3=$(( $c % 3 ));
		mod_5=$(( $c % 5 ));
		if ((mod_3 == 0)) || ((mod_5 == 0)); then
			sum=$((sum + c))
		fi
	done

}

some_func
echo $sum;